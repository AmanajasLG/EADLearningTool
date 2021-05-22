import React from "react";
import "./index.scss";

import { shelf } from "../../img";

const Aisle = ({ products, addProduct, toPreviousAisle, toNextAisle }) => {
  // const [state, setState] = React.useState({ seconds: seconds, timeout: null });

  return (
    <div className="aisle-div">
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "stretch",
        alignItems: "center",
        height: "100vh",
        position: "relative"
      }}>
        <button className="Voltar" onClick={toPreviousAisle}>{"<"}</button>
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative"
        }}>
          <div>
            <img src={shelf} alt=""/>
            <div name="items" style={{
              position: "absolute",
              top: "-33%",
              right: 0,
              bottom: 0,
              left: 0,
              display: "grid",
              gridTemplateRows: "30.5% 3% 30.5% 3% 30% 3%",
              alignItems: "flex-end"
            }}>
              {products.map((product, index) => (
                [<div className="products" key={index*2} style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    height: "calc(100% - 5px)",
                    marginBottom: "5px"
                  }}
                >
                  {[...Array(10)].map((element, index) => (
                    <div
                      key={index}
                      onClick={addProduct(product.name)}
                      className="tooltip"
                      style={{
                        backgroundImage: "url(" + product.shelfImage + ")",
                        backgroundSize: "contain",
                        // height: 110,
                        // width: 110,
                        flexGrow: 1,
                        height: "inherit",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center bottom",
                        overflow: "show",
                      }}
                    >
                      <span className="tooltiptext">{product.tooltip}</span>
                    </div>
                  ))}
                </div>,
                <span key={index*2+1}>{product.tag}</span>]
              ))}
            </div>
          </div>
        </div>
        <button className="Avançar" onClick={toNextAisle}>{">"}</button>
      </div>
    </div>
  );
};

export default Aisle;
