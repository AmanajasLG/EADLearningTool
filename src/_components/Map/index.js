import React from 'react'
import './index.scss'

const Map = ({data, onIconClick}) => {
  const [state, setState] = React.useState()
  console.log('buildings:', data)
  return(
    <svg width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Frame 4">
        <rect width="1920" height="1080" fill="#ccffcc"/>
        <g id="mapBackground">
          <path id="Vector 4" d="M101 88V238H396.5V88H101Z" stroke="black"/>
          <path id="Vector 5" d="M501 88V238H796.5V88H501Z" stroke="black"/>
          <path id="Vector 6" d="M901 88V238H1196.5V88H901Z" stroke="black"/>
          <path id="Vector 7" d="M1301 88V238H1596.5V88H1301Z" stroke="black"/>
          <path id="Vector 8" d="M101 332V482H396.5V332H101Z" stroke="black"/>
          <g id="Vector 9">
          <path d="M796.5 482V332H568.5L744 482H796.5Z" stroke="black"/>
          <path d="M501 383V482H611.5L501 383Z" stroke="black"/>
          </g>
          <path id="Vector 10" d="M901 332V482H1196.5V332H901Z" stroke="black"/>
          <path id="Vector 11" d="M1301 332V482H1596.5V332H1301Z" stroke="black"/>
          <path id="Vector 12" d="M101 576V726H396.5V576H101Z" stroke="black"/>
          <path id="Vector 13" d="M501 576V726H796.5V651L707.5 576H501Z" stroke="black"/>
          <g id="Vector 14">
          <path d="M1196.5 576H901V592L1085 726H1196.5V576Z" stroke="black"/>
          <path d="M901 665.5V726H973.5L901 665.5Z" stroke="black"/>
          </g>
          <path id="Vector 15" d="M1301 576V726H1596.5V576H1301Z" stroke="black"/>
          <path id="Vector 16" d="M101 820V970H396.5V820H101Z" stroke="black"/>
          <path id="Vector 17" d="M501 820V970H796.5V820H501Z" stroke="black"/>
          <path id="Vector 18" d="M901 820V970H1196.5V895L1086.5 820H901Z" stroke="black"/>
          <path id="Vector 19" d="M1301 820V970H1596.5V820H1301Z" stroke="black"/>
        </g>
        <g className="House stretchIn" onClick={() => onIconClick()}>
          <path id="Vector 19_2" d="M267.249 394.723V482H398.164V394.723H267.249Z" fill="#C4C4C4" stroke="black"/>
          <path id="Polygon 1" d="M333.5 310.62L406.679 393.93H260.321L333.5 310.62Z" fill="#C4C4C4"/>
        </g>
        <g className="House stretchIn">
          <path id="Vector 19_3" d="M898.249 151.103V238.38H1029.16V151.103H898.249Z" fill="#C4C4C4" stroke="black"/>
          <path id="Polygon 1_2" d="M964.5 67L1037.68 150.31H891.321L964.5 67Z" fill="#C4C4C4"/>
        </g>
        <g  className="House stretchIn">
            <path id="Vector 19_4" d="M1298.25 395.103V482.38H1429.16V395.103H1298.25Z" fill="#C4C4C4" stroke="black"/>
            <path id="Polygon 1_3" d="M1364.5 311L1437.68 394.31H1291.32L1364.5 311Z" fill="#C4C4C4"/>
        </g>
        <g  className="House stretchIn">
            <path id="Vector 19_5" d="M1297.25 639.103V726.38H1428.16V639.103H1297.25Z" fill="#C4C4C4" stroke="black"/>
            <path id="Polygon 1_4" d="M1363.5 555L1436.68 638.31H1290.32L1363.5 555Z" fill="#C4C4C4"/>
        </g>
        <g  className="House stretchIn">
            <path id="Vector 19_6" d="M667.249 883.103V970.38H798.164V883.103H667.249Z" fill="#C4C4C4" stroke="black"/>
            <path id="Polygon 1_5" d="M733.5 799L806.679 882.31H660.321L733.5 799Z" fill="#C4C4C4"/>
        </g>
        <g  className="House stretchIn">
            <path id="Vector 19_7" d="M98.2488 108.103V195.38H229.164V108.103H98.2488Z" fill="#C4C4C4" stroke="black"/>
            <path id="Polygon 1_6" d="M164.5 24L237.679 107.31H91.3209L164.5 24Z" fill="#C4C4C4"/>
        </g>
      </g>
    </svg>
  )
}

export default Map
