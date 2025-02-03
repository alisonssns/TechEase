import ProductsHolder from '../layout/products/ProductsHolder'
import Recent from '../layout/products/RecentProducts'
import Carrossel from '../layout/carrossel/Carrossel';
import Categories from '../layout/header/Categories';
import styles from '../styles/Home.module.css'
import { useParams } from 'react-router-dom';

function Home() {
    const {categoria} = useParams();

    return (
        <div className={styles.home}>
            <Carrossel />
            <ProductsHolder cat_prod={categoria || ''} />
            <Recent />
            <Categories />
        </div>
    )
}

export default Home;