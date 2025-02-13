import styles from '../../styles/ShoppingCart.module.css'
import CartProductRow from './CartProductRow'
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

function CartProducts() {
    const { carrinho } = useCart();
    const navigate = useNavigate();

    return (
        <div className={styles.cartProducts}>
            <h3>Produtos do carrinho</h3>
            {carrinho.length === 0 ? (
                <div className={styles.empty}>
                    <p>Carrinho vazio!</p>
                    <b onClick={() => navigate('/home')}>Voltar à página de produtos</b>
                </div>
            ) : (
                <div className={styles.cartProductsHolder}>
                    {carrinho.map((item) => (
                        <CartProductRow produto={item} key={item.id_prod} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CartProducts