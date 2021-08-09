import React from "react";
import "./index.scss";
import houses from "./houses";
const Map = ({ data, onIconClick }) => {
  const [state, setState] = React.useState();
  const onClick = (index) =>
    onIconClick && onIconClick.length > index
      ? onIconClick[index](index)
      : null;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1920 1080"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Frame 4">
        <rect width="1920" height="1080" fill="#ccffcc" />
        <g id="mapBackground">
          <path id="Vector 4" d="M101 88V238H396.5V88H101Z" stroke="black" />
          <path id="Vector 5" d="M501 88V238H796.5V88H501Z" stroke="black" />
          <path id="Vector 6" d="M901 88V238H1196.5V88H901Z" stroke="black" />
          <path id="Vector 7" d="M1301 88V238H1596.5V88H1301Z" stroke="black" />
          <path id="Vector 8" d="M101 332V482H396.5V332H101Z" stroke="black" />
          <g id="Vector 9">
            <path d="M796.5 482V332H568.5L744 482H796.5Z" stroke="black" />
            <path d="M501 383V482H611.5L501 383Z" stroke="black" />
          </g>
          <path
            id="Vector 10"
            d="M901 332V482H1196.5V332H901Z"
            stroke="black"
          />
          <path
            id="Vector 11"
            d="M1301 332V482H1596.5V332H1301Z"
            stroke="black"
          />
          <path id="Vector 12" d="M101 576V726H396.5V576H101Z" stroke="black" />
          <path
            id="Vector 13"
            d="M501 576V726H796.5V651L707.5 576H501Z"
            stroke="black"
          />
          <g id="Vector 14">
            <path d="M1196.5 576H901V592L1085 726H1196.5V576Z" stroke="black" />
            <path d="M901 665.5V726H973.5L901 665.5Z" stroke="black" />
          </g>
          <path
            id="Vector 15"
            d="M1301 576V726H1596.5V576H1301Z"
            stroke="black"
          />
          <path id="Vector 16" d="M101 820V970H396.5V820H101Z" stroke="black" />
          <path id="Vector 17" d="M501 820V970H796.5V820H501Z" stroke="black" />
          <path
            id="Vector 18"
            d="M901 820V970H1196.5V895L1086.5 820H901Z"
            stroke="black"
          />
          <path
            id="Vector 19"
            d="M1301 820V970H1596.5V820H1301Z"
            stroke="black"
          />
        </g>
        {houses.map((house, index) =>
          house({ key: index, onClick: () => onClick(index) })
        )}
      </g>
    </svg>
  );
};

export default Map;
