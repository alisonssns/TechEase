import ProductsHolder from '../layout/products/ProductsHolder'
import Carrossel from '../layout/Carrossel/Carrossel';
import styles from '../styles/Home.module.css'

function Home() {
    return (
        <div className={styles.home}>
            <Carrossel />
            <ProductsHolder/>
        </div>
    )
}

export default Home;