import styles from '../../styles/Products.module.css'

interface ProductCardProps {
    id: number;
    nome: string;
    valor: number;
    desc_home: string;
    img: string;
}

function ProductCard({ id, nome, valor, desc_home, img }: ProductCardProps) {
    return (
        <div className={styles.productCard}>
            <figure className={styles.imageContainer}>
                <img src={`/products/${img}`} alt={nome} className={styles.productImage} />
            </figure>
            <div className={styles.productInfo}>
                <div className={styles.productTitle}>
                    <h3 className={styles.productName}>{nome}</h3>
                    <p className={styles.desc}>{desc_home}</p>
                </div>
                <p className={styles.productPrice}>R$ {valor.toFixed(2)}</p>
            </div>
        </div>
    )
}

export default ProductCard;
