import React from "react";
import "./index.scss";

const TaggedIcon = ({ icon, onClick, message, ...props }) => {

  return (
    <div id="taggedIcon" onClick={onClick} {...props}>
      <img className='icon' src={icon} alt=""></img>
      <span>{message}</span>
    </div>
  );
};

export default TaggedIcon;
