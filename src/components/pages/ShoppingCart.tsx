import { useEffect, useState } from 'react';
import CartProducts from '../layout/cart/CartProducts'
import OrderDetails from '../layout/cart/OrderDetails'
import styles from '../styles/ShoppingCart.module.css'
import {Produto} from '../layout/products/Product';

function ShoppingCart() {
        return (
        <section className={styles.shoppingCart}>
            <div className={styles.cartHolder}>
                <CartProducts />
                <OrderDetails />
            </div>
        </section>
    )
}

export default ShoppingCart