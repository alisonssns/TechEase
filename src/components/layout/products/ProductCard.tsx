import styles from '../../styles/Products.module.css'
import { useNavigate } from "react-router-dom";
import { Produto } from '../../interfaces/Product';

export default function ProductCard({ produto }: {produto : Produto}) {
    const navigate = useNavigate();   

    return (
        <div className={styles.productCard} onClick={()=> navigate(`/SingleProduct?nome=${produto.nome_prod}&id=${produto.id_prod})`)}>
            <figure className={styles.imageContainer}>
                <img src={`/products/${produto.img_prod}`} alt={produto.nome_prod} className={styles.productImage} />
            </figure>
            <div className={styles.productInfo}>
                <div className={styles.productTitle}>
                    <h3 className={styles.productName}>{produto.nome_prod}</h3>
                    <p className={styles.desc}>{produto.desc_prod_home}</p>
                </div>
                <p className={styles.productPrice}>R$ {produto.valor_prod.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
        </div>
    )
}
