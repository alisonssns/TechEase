import CartProducts from '../layout/cart/CartProducts'
import Recomendations from '../layout/cart/Recomendations'
import OrderDetails from '../layout/cart/OrderDetails'
import styles from '../styles/ShoppingCart.module.css'

export default function ShoppingCart() {
    return (
        <section className={styles.shoppingCart}>
            <div className={styles.cartHolder}>
                <CartProducts />
                <OrderDetails />
            </div>
            <Recomendations/>
        </section>
    )
}