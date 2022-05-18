import * as React from "react";
import { IGitData, IPageItem } from "../type";

interface IManageProps {
  visible: boolean;
  list: IGitData[];
  pageList: IPageItem[];
  user: User | null;
}

function GitDataItem(props: IGitData) {
  const { url, page, manager } = props;
  return (
    <div className="form-item git-item">
      <div className="page-info">
        <span className="page">{page}</span>
        <span className="manager">{manager}</span>
      </div>
      <div className="git-info">
        <span className="url">{url}</span>
        <span className="btns"></span>
      </div>
    </div>
  );
}

function GitManage(
  props: IManageProps & { onEdit: (data: IGitData | null) => void }
) {
  const { list = [], pageList = [], visible, onEdit, user } = props;
  const handleEdit = () => {
    onEdit && onEdit(null);
  };
  const disabled = !user || !user.id;
  return (
    <div className={visible ? "" : "hide"}>
      {list && list.map((item, index) => <GitDataItem key={index} {...item} />)}
      <div className="form-item">
        <button
          className="button button--primary button-block"
          onClick={handleEdit}
          disabled={disabled}
        >
          新增Git
        </button>
      </div>
    </div>
  );
}

function GitSetting(props: {
  gitData: IGitData | null;
  pageList: IPageItem[];
  onSubmit: (data: IGitData) => void;
}) {
  const { gitData, pageList, onSubmit } = props;
  const currentPage = pageList.find((cv) => cv.is_active);
  const initUrl = (gitData && gitData.url) || "";
  const initPage =
    (gitData && gitData.page) || (currentPage && currentPage.id) || "";
  const initToken = (gitData && gitData.token) || "";
  const [warning, setWarning] = React.useState("");
  const [githubRepo, setGithubRepo] = React.useState(initUrl);
  const [figmaPage, setFigmaPage] = React.useState(initPage);
  const [githubToken, setGithubToken] = React.useState(initToken);
  function handleChange() {}
  function handlePageChange(e) {
    setFigmaPage(e.target.value);
  }
  function handleSubmit() {
    const id = (gitData && gitData.id) || generateUUID();
    if (!figmaPage) {
      setWarning("请选择页面");
      return;
    } else if (!pageList.some((cv) => cv.id === figmaPage)) {
      setWarning("无效页面");
      return;
    }
    if (!githubRepo) {
      setWarning("请输入Git地址");
      return;
    }
    if (!githubToken) {
      setWarning("请输入Git Token）");
      return;
    }
    const postData = {
      id,
      page: figmaPage,
      url: githubRepo,
      token: githubToken,
    };
    onSubmit(postData);
  }
  return (
    <div>
      <div className="onboarding-tip">
        <div className="onboarding-tip__icon">
          <div className="icon icon--smiley"></div>
        </div>
        <div className="onboarding-tip__msg">
          Hi, Welcome here. This plugin helps you convert icons to react
          component and publish to NPM. It should be used with Github and NPM.
          Please read the docs before using.
          <br />
          <br />
          <a
            href="https://github.com/leadream/figma-icon-automation"
            target="_blank"
          >
            Docs here
          </a>
        </div>
      </div>
      {warning && (
        <div className="form-item">
          <div className="type type--pos-medium-normal alert alert-warning">
            {warning}
          </div>
        </div>
      )}
      <div className="form-item">
        <select
          disabled={pageList.length <= 0}
          value={figmaPage}
          onChange={handlePageChange}
        >
          {pageList.map((cv) => {
            return (
              <option key={cv.id} value={cv.id}>
                {cv.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-item">
        <input
          name="githubRepo"
          className="input"
          placeholder="Github Repository URL"
          onChange={(e) => {
            setGithubRepo(e.target.value);
          }}
          value={githubRepo}
        />
      </div>
      <div className="form-item">
        <input
          name="githubToken"
          className="input"
          placeholder="Github Token"
          onChange={(e) => {
            setGithubToken(e.target.value);
          }}
          value={githubToken}
        />
      </div>
      <div className="form-item">
        <button
          className="button button--primary button-block"
          onClick={handleSubmit}
        >
          {props ? "Update" : "Go"}
        </button>
      </div>
      <div className="setting-footer form-item type type--pos-medium-normal">
        developed by{" "}
        <a href="https://github.com/leadream" target="_blank">
          Leadream
        </a>
      </div>
    </div>
  );
}

export default function (props: IManageProps & { visible: boolean }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingData, setEditingData] = React.useState(null);
  const { user } = props;
  console.log(props, "props");
  const containerClass = props.visible ? "" : "hide";
  function onEdit(data: IGitData | null) {
    if (!user || !user.id) return;
    setIsEditing(true);
    setEditingData(data);
  }
  function onSubmit(data: Pick<IGitData, "id" | "page" | "url" | "token">) {
    if (!user || !user.id) return;
    setIsEditing(false);
    const newList = props.list.slice(0);
    const existIndex = newList.findIndex((cv) => cv.id === data.id);
    const { id, name } = user;
    const newData = { ...data, managerId: id, manager: name };
    if (existIndex === -1) {
      newList.push(newData);
    } else {
      Object.assign(newList[existIndex], newData);
    }
    console.log(newData);
    // 更新当前用户的名字信息 防止改名
    newList.forEach((cv) => {
      const { managerId, manager } = cv;
      if (managerId === id && manager !== name) {
        cv.manager = name;
      }
    });
    parent.postMessage(
      {
        pluginMessage: {
          type: "setGitData",
          data: newList,
        },
      },
      "*"
    );
  }
  return (
    <div className={containerClass}>
      {isEditing ? (
        <GitSetting gitData={editingData} {...props} onSubmit={onSubmit} />
      ) : (
        <GitManage {...props} onEdit={onEdit} />
      )}
    </div>
  );
}

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
