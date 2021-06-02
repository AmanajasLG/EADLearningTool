import React from 'react'
import styles from '../../index.module.scss'
import { cart as cartImg } from '../../../../img'

const ShopCart = ({cart, ingredientList, onItemClick}) => {
  return(
      <div className={styles.cart}>
        <div className={styles.cartItems}>
          {cart.map((product, index) => (
            <div className={styles.cartItem} key={index}>
              <img
                src={
                  ingredientList.find(
                    (ingredient) =>
                      ingredient.name === product.name
                  ).image
                }
                alt=""
                onClick={onItemClick(index)}
                className={styles.cartItemImg}
              />
              <span>{product.count}</span>
            </div>
          ))}
        </div>
        <img src={cartImg} alt="" />
      </div>
  )
}

export default ShopCart
