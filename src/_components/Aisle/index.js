import React from "react";
import styles from "./index.module.scss";

import { shelf } from "../../img";

const Aisle = ({ products, addProduct, toPreviousAisle, toNextAisle }) => {
	// const [state, setState] = React.useState({ seconds: seconds, timeout: null });

	return (
		<div id={styles.aisle}>
			<button className={styles.btnChangeAisle} onClick={toPreviousAisle}>{"❮"}</button>
			<div id={styles.shelves}>
				<img src={shelf} alt=""/>
				<div className={styles.items}>
					{products.map((product, index) => (
						[<div className={styles.products} key={index*2}>
							{[...Array(10)].map((element, index) => (
								<div
									key={index}
									onClick={addProduct(product.name)}
									className={styles.tooltip}
								>
									<img src={product.shelfImage}/>
									<span className={styles.tooltiptext}>{product.tooltip}</span>
								</div>
							))}
						</div>,
						<span key={index*2+1} className={styles.shelfPrice}>{product.tag}</span>]
					))}
				</div>
			</div>
			<button className={styles.btnChangeAisle} onClick={toNextAisle}>{"❯"}</button>
		</div>
	);
};

export default Aisle;
