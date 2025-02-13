import axios from 'axios';
import styles from '../../styles/ShoppingCart.module.css'
import { useCart } from "../../contexts/CartContext"

function OrderDetails() {
    const { carrinho, setAtualizarCarrinho, atualizarCarrinho } = useCart();

    const checkout = () => {
        axios.post("http://localhost:5000/api/checkout", { carrinho, userId: '54' })
            .then((response) => {
                alert(response.data);
                setAtualizarCarrinho(!atualizarCarrinho);
            })
            .catch((err) => {
                console.error("Erro ao realizar pedido:", err);
                alert("Erro ao realizar o pedido. Tente novamente.");
            });
    };


    return (
        <div className={styles.orderDetails}>
            <h3>Resumo da compra</h3>

            {carrinho.length > 0 && (<>
                <div className={styles.itens}>
                    {carrinho.slice(0, 3).map((item, index) => (
                        <div key={index} className={styles.row}>
                            <p>{`${item.nome_prod} (${item.quantidade})`}</p>
                            <p>{`R$ ${(item.valor_prod * item.quantidade).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
                        </div>
                    ))}
                </div>
                {carrinho.length > 3 && (
                    <i>{`e mais ${carrinho.length - 3} itens...`}</i>
                )}
                <div className={styles.row}>
                    <b>Valor total</b>
                    <b>{`R$ ${carrinho.reduce((total, item) => total + (item.valor_prod * item.quantidade), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</b>
                </div>

                <input type="submit" value="Finalizar Compra" onClick={checkout} />

                <div className={styles.option}>
                    <label><input type="radio" name="option" className="hide" defaultChecked />Boleto</label>
                    <label><input type="radio" name="option" className="hide" />Pix</label>
                </div>
            </>
            )}
        </div>
    )
}

export default OrderDetails