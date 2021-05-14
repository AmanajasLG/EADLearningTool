import React from "react";

const Aisle = ({ products, aisleName, addProduct }) => {
  // const [state, setState] = React.useState({ seconds: seconds, timeout: null });

  return (
    <div className="Prateleira">
      {/* {aisleName && <div>Corredor: {aisleName}</div>} */}
      {products.map((product, index) => (
        <button key={index} onClick={addProduct(product.name)}>
          {product.name}
        </button>
      ))}
    </div>
  );
};

export default Aisle;
