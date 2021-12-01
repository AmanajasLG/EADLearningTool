import React from  'react'
import { recipeBgRound } from '../../img'
const RotationFocus = ({imageUrl, style}) => {
  return(
    <div style={{overflow: "visible", ...style}}>
      <img
        className="rotate backwards"
        style={{
          position: "absolute",
          width: "60%",
          left: "25%",
          top: "-130px",
          opacity: "60%",
        }}
        src={recipeBgRound}
        alt=""
      />
      <img
        className="rotate"
        style={{
          position: "absolute",
          width: "60%",
          left: "25%",
          top: "-130px",
        }}
        src={recipeBgRound}
        alt=""
      />
      <img
        className="dishPresentation"
        style={{ position: "absolute", right: "30%", width: "30%" }}
        src={imageUrl}
        alt=""
      />
    </div>
  )
}

export default RotationFocus
