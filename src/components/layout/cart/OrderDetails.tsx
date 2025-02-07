import { FaThumbsUp } from "react-icons/fa6"
import styles from '../../styles/ShoppingCart.module.css'
import { useCart } from "./CartContext"

function OrderDetails() {
    const { carrinho } = useCart();

    return (
        <div className={styles.orderDetails}>
            <h3>Resumo da compra</h3>

            {carrinho.length > 0 && (<>
                <div className={styles.itens}>
                    {carrinho.slice(0, 3).map((item, index) => (
                        <div key={index} className={styles.row}>
                            <p>{`${item.nome_prod} (${item.quantidade})`}</p>
                            <p>{`R$ ${(item.valor_prod * item.quantidade).toFixed(2)}`}</p>
                        </div>
                    ))}
                </div>
                {carrinho.length > 3 && (
                    <i>{`e mais ${carrinho.length - 3} itens...`}</i>
                )}
                <div className={styles.row}>
                    <b>Valor total</b>
                    <b>{`R$ ${carrinho.reduce((total, item) => total + (item.valor_prod * item.quantidade), 0).toFixed(2)}`}</b>
                </div>

                <input type="submit" value="Finalizar Compra" />

                <div className={styles.option}>
                    <label><input type="radio" name="option" className="hide" />Boleto</label>
                    <label><input type="radio" name="option" className="hide" />Pix</label>
                </div>
            </>
            )}
        </div>
    )
}

export default OrderDetails