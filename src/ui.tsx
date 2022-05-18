import * as React from "react";
import * as ReactDOM from "react-dom";
import Updator from "./components/Updator";
import Manage from "./components/Manage";
import "../assets/ds.css";
import "./style.css";

declare function require(path: string): any;
class App extends React.Component {
  state = {
    updatorVisible: false,
    gitDataList: [],
    webhookData: null,
    settingSwitch: false,
    isDone: false,
    currentUser: null,
    docPageList: [],
  };
  onSucceed = () => {
    this.setState({ isDone: true });
  };
  toggleView = (gitDataList?) => {
    const { updatorVisible } = this.state;
    this.setState({ updatorVisible: !updatorVisible });
    if (gitDataList === true) {
      const { settingSwitch } = this.state;
      this.setState({ settingSwitch: !settingSwitch });
    } else if (gitDataList) {
      this.setState({
        gitDataList: gitDataList,
      });
    }
  };
  componentDidMount() {
    // receive messages here
    window.onmessage = async (event) => {
      const msg = event.data.pluginMessage;
      switch (msg.type) {
        case "gitDataGot":
          if (msg.list) {
            this.setState({
              // updatorVisible: true,
              gitDataList: msg.list,
            });
          }
          break;
        case "currentUserGot":
          if (msg.user) {
            this.setState({
              currentUser: msg.user,
            });
          }
          break;
        case "webhookDataGot":
          if (msg.webhookData) {
            this.setState({
              webhookData: msg.webhookData,
            });
          }
          break;
        case "docPageListGot":
          if (msg.docPageList) {
            this.setState({
              docPageList: msg.docPageList,
            });
          }
          break;
      }
    };
  }
  render() {
    const {
      updatorVisible,
      gitDataList,
      webhookData,
      settingSwitch,
      isDone,
      currentUser,
      docPageList,
    } = this.state;
    const tabVisible = gitDataList && !isDone;
    return (
      <div className={"container " + (!tabVisible ? "" : "container-with-tab")}>
        <div className={"bar-adjust " + (tabVisible ? "" : "hide")}>
          <div
            className={
              "adjust-item type type--pos-medium-bold " +
              (updatorVisible ? "" : "active")
            }
            onClick={(e) => this.toggleView()}
          >
            Manage
          </div>
          <div
            className={
              "adjust-item type type--pos-medium-bold " +
              (updatorVisible ? "active" : "")
            }
            onClick={(e) => this.toggleView(true)}
          >
            Publish
          </div>
        </div>
        <Manage
          visible={!updatorVisible}
          list={gitDataList}
          pageList={docPageList}
          user={currentUser}
          // onGithubSet={this.toggleView}
          // settingSwitch={settingSwitch}
        />
        {/* <Updator
          onSucceed={this.onSucceed}
          visible={updatorVisible}
          githubData={gitDataList}
          webhookData={webhookData}
        /> */}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react-page"));
