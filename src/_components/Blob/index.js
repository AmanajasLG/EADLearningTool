import React from 'react'
import { blobAzul } from '../../img'
import { renderToStaticMarkup } from 'react-dom/server'

const Blob = ({duration, fill, stroke, strokeWidth, animation, ...props}) => {
  return(
  <svg xmlns="http://www.w3.org/2000/svg" width="auto" preserveAspectRatio viewBox="-200 0 1800 1080" {...props}>
      <path id="Path_5521" data-name="Path 5521" fill={fill ? fill: "#d6e3f4"}
        stroke={ stroke }
        strokeWidth={strokeWidth}
        d="M1122.91 806.578
        C1193.7 670.545 1198.48 489.306 1149.6 343.976
        C1107.6 218.88 1013.88 123.442 905.72 66.6079
        C780.231 0.702494 630.654 -18.9236 495.973 22.6775
        C460.55 33.6025 426.071 43.6497 392.661 61.6292
        C255.741 135.338 274.91 220.659 226.888 283.822
        C186.486 336.976 116.417 417.611 67.7008 458.349
        C-63.8393 568.259 11.9697 825.455 163.713 912.282
        C324.632 1004.43 947.554 1143.52 1122.91 806.578Z"
        >
        <animate dur={duration? duration : "15s"} repeatCount="indefinite" attributeName="d"
          values="
          M1122.91 806.578
          C1193.7 670.545 1198.48 489.306 1149.6 343.976
          C1107.6 218.88 1013.88 123.442 905.72 66.6079
          C780.231 0.702494 630.654 -18.9236 495.973 22.6775
          C460.55 33.6025 426.071 43.6497 392.661 61.6292
          C255.741 135.338 274.91 220.659 226.888 283.822
          C186.486 336.976 116.417 417.611 67.7008 458.349
          C-63.8393 568.259 11.9697 825.455 163.713 912.282
          C324.632 1004.43 947.554 1143.52 1122.91 806.578Z;
          M1340.5 652.5
          C1411.3 516.467 1326.9 434.024 1123.5 332
          C920.105 229.976 1097.66 122.834 989.5 66
          C864.011 0.0945511 686.473 -29.8226 518.5 42.4999
          C350.527 114.822 349 -56.0001 264.5 87.9999
          C180 232 358.021 241.813 310 304.976
          C269.598 358.13 -41.0002 393.5 5.00002 683
          C51.0003 972.5 620.757 853.673 772.5 940.5
          C933.42 1032.65 1165.14 989.444 1340.5 652.5Z;
          M1438 440.5
          C1389 178 1221 333.5 1102.5 293
          C984 252.5 912.661 78.8338 804.5 22.0001
          C679.011 -43.9054 567 58.5 479 130
          C391 201.5 226.5 86.0001 179 181
          C131.5 276 -11 413 1.00002 516.5
          C13 620 32.9996 794 245 921.5
          C457 1049 879.757 860.173 1031.5 947
          C1192.42 1039.15 1487 703 1438 440.5Z;
          M1122.91 806.578
          C1193.7 670.545 1198.48 489.306 1149.6 343.976
          C1107.6 218.88 1013.88 123.442 905.72 66.6079
          C780.231 0.702494 630.654 -18.9236 495.973 22.6775
          C460.55 33.6025 426.071 43.6497 392.661 61.6292
          C255.741 135.338 274.91 220.659 226.888 283.822
          C186.486 336.976 116.417 417.611 67.7008 458.349
          C-63.8393 568.259 11.9697 825.455 163.713 912.282
          C324.632 1004.43 947.554 1143.52 1122.91 806.578Z"/>
      </path>
  </svg>
  )
}

export default Blob

const BlobBg = ({children, style, ...props}) => (
  <div style={{background: `url("data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(<Blob {...props.blob} />))}")`,
    brackgroundRepeat: 'no-repeat', backgroundPosition: 'center', ...style}}
  {...props}>
    {children}
  </div>
)

export { BlobBg }
