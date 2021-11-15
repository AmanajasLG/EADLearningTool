import React from "react";

const style = (alternative) => ({
  backgroundColor: alternative ? "#59316D" : "#535c89",
  borderRadius: "0 2.5em 0 0",
  height: "35%",
  padding: "1.5em",
  marginBottom: "9em",
  boxShadow: "1em 1em 0px 0px #77777750",
  transition: "50ms ease-in-out",
  overflow: "visible",
  position: "absolute",
  bottom: "0px",
  left: "15%",
  width: "80%",
});

const DialogBox = (props) => {
  return <div style={style(props.alternative)}>{props.children}</div>;
};

export default DialogBox;
