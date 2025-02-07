import styles from '../../styles/Products.module.css'
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    desc_home: string;
    img: string;
}

function ProductCard({ id, name, price, desc_home, img }: ProductCardProps) {
    const Navigation = useNavigate();   

    const handleClick = (name : string, id: number) => {
        Navigation(`/SingleProduct/${name}/${id}`)
    }

    return (
        <div className={styles.productCard} onClick={()=> handleClick(name, id)}>
            <figure className={styles.imageContainer}>
                <img src={`/products/${img}`} alt={name} className={styles.productImage} />
            </figure>
            <div className={styles.productInfo}>
                <div className={styles.productTitle}>
                    <h3 className={styles.productName}>{name}</h3>
                    <p className={styles.desc}>{desc_home}</p>
                </div>
                <p className={styles.productPrice}>R$ {price.toFixed(2)}</p>
            </div>
        </div>
    )
}

export default ProductCard;
