import ProductsHolder from '../layout/products/ProductsHolder'
import Recent from '../layout/products/RecentProducts'
import Carrossel from '../layout/carrossel/Carrossel';
import Categories from '../layout/products/Categories';
import styles from '../styles/Home.module.css'
import { useParams } from 'react-router-dom';

function Home() {
    const { filter } = useParams();

    return (
        <div className={styles.home}>
            <Carrossel />
            <div className={styles.products}>
                <h1>Produtos Mais Vendidos</h1>
                <h2>Confira os itens mais populares entre nossos clientes</h2>
                <ProductsHolder filter={filter || ''} limit='12' />
            </div>

            <section className={styles.products}>
                <h1>Recem adicionados</h1>
                <Recent />
            </section>

            <Categories />
        </div>
    )
}

export default Home;