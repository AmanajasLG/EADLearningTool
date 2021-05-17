import React from "react";
import { avatar, home, notifications, settings } from "../../img";
import { logout } from "../../_actions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Button from "@material-ui/core/Button";

const UserHeader = ({ pageInfo }) => {
  let headerInfo = useSelector((state) => state.header);
  const [state, setState] = React.useState({ view: "default" });
  const dispatch = useDispatch();
  const alert = useAlert();

  const clickProfile = () => {
    setState({ ...state, view: "profile" });
    alert.show("Vc achou onde faz para abrir o seu perfil! \n\n Ending 3/15");
  };

  const clickHome = () => {
    setState({ ...state, view: "home" });
    alert.show("Vc achou onde faz para voltar ao início! \n\n Ending 1/15");
  };

  const clickNotif = () => {
    setState({ ...state, view: "notif" });
    alert.show(
      "Vc achou onde faz para ver suas notificações! \n\n Ending 7/15"
    );
  };

  const clickSettings = () => {
    setState({ ...state, view: "settings" });
    alert.show(
      "Vc achou onde faz para abrir suas configurações! \n\n Ending 8/15"
    );
  };

  return (
    <header id="app-header" className={headerInfo.state.toLowerCase()}>
      <div className="group-btns" id="left-btns">
        <div className="header-btn" id="home-btn" onClick={clickHome}>
          <img src={home} alt="Home"></img>
        </div>
        <div className="header-btn" id="notif-btn" onClick={clickNotif}>
          <img src={notifications} alt="Notifications"></img>
        </div>
        <div className="header-btn" id="settings-btn" onClick={clickSettings}>
          <img src={settings} alt="Settings"></img>
        </div>
      </div>
      <div id="pageTitle">
        <div id="mainTitle">{headerInfo.title}</div>
        <div id="subTitle">{headerInfo.subtitle}</div>
      </div>
      <div className="group-btns" id="right-btns">
        <div id="profilePic" onClick={clickProfile}>
          <img src={avatar} alt="Profile_Picture" />
        </div>
        <div
          className="header-btn"
          id="logout-btn"
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </div>
      </div>
      {/* style provisório para teste*/}
      {state.view === "settings" && (
        <div
          className="ConfigPopUp"
          style={{
            position: "absolute",
            backgroundColor: "#ddddee",
            top: 100,
            margin: "0 auto",
            width: "50%",
            height: 500,
          }}
        >
          Configurações
          <Button>Config 1</Button>
          <Button>Config 2</Button>
          <Button>Config 3</Button>
          <Button onClick={() => setState({ ...state, view: "default" })}>
            X
          </Button>
        </div>
      )}
    </header>
  );
  /**/
};

export default UserHeader;
