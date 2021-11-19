import React from "react";
import parser from "html-react-parser";
import styles from "./index.module.scss";

const InlineSVG = ({ src, ...props }) => {
  const [state, setState] = React.useState({
    loaded: false,
  });

  React.useEffect(() => {
    if(!src) return

    fetch(src, { headers: { "Content-Type": "text/html" } }).then(
      (response) => {
        if (response.ok)
          return response
            .text()
            .then((text) => setState((s) => ({ ...s, loaded: text })));
        else setState((s) => ({ ...s, loaded: " " })); // Tem que ter o espaço para ele considerar true
      }
    );
  }, [src]);

  return (
    <svg className="inline-svg-wrapper" {...props}>
      {!state.loaded ? (
        <svg className={styles["svg-temp"]}></svg>
      ) : (
        parser(state.loaded)
      )}
    </svg>
  );
};

export default InlineSVG;
