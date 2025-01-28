import styles from '../../styles/Product.module.css'

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
                <img src={`../../../../public/products/${img}`} alt={nome} className={styles.productImage} />
            </figure>
            <div className={styles.productInfo}>
                <div className={styles.productNamePrice}>
                    <h3 className={styles.productName}>{nome}</h3>
                    <p className={styles.productPrice}>R$ {valor}</p>
                    <p className={styles.freeShipping}>Frete grátis</p>
                </div>

                <div className={styles.productDescription}>
                    <p>{desc_home}</p>
                </div>
            </div>
            <button className={styles.addButton} aria-label={`Adicionar ${nome} ao carrinho`} id={id.toString()}>
                Adicionar ao carrinho
            </button>
        </div>
    )
}

export default ProductCard;
