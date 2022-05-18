import { IGitData, PluginGitDataKey, PluginGitTokenKey } from "./type";
import { getLocalData, setLocalData } from "./storage";
figma.showUI(__html__, { width: 320, height: 436 });

function getGitDataList() {
  let list = [];
  try {
    const res = figma.root.getPluginData(PluginGitDataKey);
    list = JSON.parse(res);
  } catch (err) {
    console.log("Get Plugin Git Data Error: ", err);
  }
  console.log("Figma Plugin Git Data Got:", list);
  figma.ui.postMessage({ type: "gitDataGot", list });
}

function setGitDataList(list: IGitData[]) {
  const listStr = JSON.stringify(list);
  figma.root.setPluginData(PluginGitDataKey, listStr);
}

function getDocPageList() {
  const currentPage = figma.currentPage;
  const docPageList = figma.root.children
    .filter((node) => node.type === "PAGE" && !node.removed)
    .map((cv) => {
      const { id, name } = cv;
      const is_active = currentPage.id === id;
      return { id, name, is_active };
    });
  figma.ui.postMessage({
    type: "docPageListGot",
    docPageList,
  });
}

function getCurrentUser() {
  const user = figma.currentUser;
  console.log("user", user);
  if (!user.id) {
    console.warn("User not login");
    return;
  }
  figma.ui.postMessage({
    type: "currentUserGot",
    user,
  });
}

// send github data to UI
function init() {
  getGitDataList();
  getCurrentUser();
  getDocPageList();
  // getLocalData("webhookData").then((webhookData) => {
  //   figma.ui.postMessage({ type: "webhookDataGot", webhookData });
  // });
  // figma.currentPage.setPluginData(
  //   "github-webhook-plugin",
  //   JSON.stringify({
  //     a: "1111",
  //     b: "22222",
  //   })
  // );
  // figma.root.setPluginData("root-value", "test root");

  console.log(figma.currentPage.getPluginData("github-webhook-plugin"));
  console.log(figma.root.getPluginData("root-value"));
  console.log(figma.root);
  console.log(figma.currentUser);
}

figma.ui.onmessage = (msg) => {
  switch (msg.type) {
    case "setGitData":
      setGitDataList(msg.data);
      getGitDataList();
      // getGitDataList().then((list) => {
      //   console.log("Figma Plugin Git Data Got:", list);
      //   figma.ui.postMessage({ type: "gitDataGot", list });
      // });
      break;
    case "setWebhookData":
      setLocalData("webhookData", msg.webhookData);
      break;
    case "cancel":
      figma.closePlugin();
      break;
  }
};

init();
