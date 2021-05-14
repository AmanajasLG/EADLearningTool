import React from "react";
import "./index.scss";

import shelf from "../../../../img/Game3/shelf.svg";
import { ShowChart } from "@material-ui/icons";

const Aisle = ({ products, aisleName, addProduct }) => {
  // const [state, setState] = React.useState({ seconds: seconds, timeout: null });

  return (
    <div>
      <img
        src={shelf}
        alt=""
        style={{ position: "absolute", zIndex: -1, width: "60vw" }}
      />
      {/* {aisleName && <div>Corredor: {aisleName}</div>} */}
      <div id="shelves">
        {products.map((product) => (
          <div className="products">
            {[...Array(10)].map(() => (
              <div
                onClick={addProduct(product.name)}
                className="tooltip"
                style={{
                  backgroundImage: "url(" + product.image + ")",
                  backgroundSize: "cover",
                  height: 60,
                  width: 60,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  overflow: "show",
                }}
              >
                <span className="tooltiptext">{product.tooltip}</span>
              </div>
            ))}

            <span>{product.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aisle;
