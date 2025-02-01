import ProductsHolder from '../layout/products/ProductsHolder'
import Recent from '../layout/products/RecentProducts'
import Carrossel from '../layout/carrossel/Carrossel';
import Categories from '../layout/header/Categories';
import styles from '../styles/Home.module.css'

function Home() {
    return (
        <div className={styles.home}>
            <Carrossel />
            <ProductsHolder />
            <Recent />
            <Categories />
        </div>
    )
}

export default Home;