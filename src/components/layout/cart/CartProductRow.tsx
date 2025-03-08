import styles from '../../styles/ShoppingCart.module.css'
import { TiPlus as Plus, TiMinus as Minus } from "react-icons/ti";
import { FaXmark as Remove } from 'react-icons/fa6';
import { Produto } from '../../interfaces/Product';
import { useUser } from '../../contexts/UserContext';

export default function CartProductRow({ produto }: { produto: Produto }) {
    const { gerenciarCarrinho } = useUser();

    return (
        <div className={styles.row}>
            <img src={`/products/${produto.img_prod}`} alt={produto.nome_prod} />
            <div className={styles.info}>
                <b>{produto.nome_prod}</b>
                <i>{produto.cat_prod}</i>
            </div>
            <div className={styles.quantity}>
                <Minus onClick={() => gerenciarCarrinho(produto.id_prod, 1)} />
                <p>{produto.quantidade}</p>
                <Plus onClick={() => gerenciarCarrinho(produto.id_prod, 0)} />
            </div>
            <b className={styles.price}>R$ {(produto.valor_prod).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b>
            <div className={styles.remove}>
                <Remove onClick={() => gerenciarCarrinho(produto.id_prod, 2)} />
            </div>
        </div >
    )
}