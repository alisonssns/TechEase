import { useLocation, useNavigate} from "react-router-dom";
import { useState } from "react";
import ProductsHolder from "../layout/products/ProductsHolder";
import styles from "../styles/SearchPage.module.css";

export default function SearchPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const filter = searchParams.get('filter');
    const orderFilter = searchParams.get('orderFilter');
    const [totalResults, setTotalResults] = useState(0);
    const [order, setOrder] = useState(orderFilter || "");
    const navigate = useNavigate();
    const apply = () => {
        navigate(`/search/?filter=${filter}&orderFilter=${order}`)
    }

    return (
        <section className={styles.searchSection}>
            <h2>{totalResults} Resultados para "{filter}"</h2>
            <div className={styles.filters}>
                <div className={styles.categories}>
                    <label>
                        <input type="radio" name="order" className="hide" onClick={() => setOrder('3')} /> Maior valor
                    </label>
                    <label>
                        <input type="radio" name="order" className="hide" onClick={() => setOrder('2')} /> Menor Valor
                    </label>
                    <label>
                        <input type="radio" name="order" className="hide" onClick={() => setOrder('0')} /> Recentes
                    </label>
                    <label>
                        <input type="radio" name="order" className="hide" onClick={() => setOrder('1')} /> Mais Antigos
                    </label>
                </div>
                <button onClick={apply}>Aplicar</button>
            </div>
            <div className={styles.results}>
                <ProductsHolder filter={filter || ""} order={orderFilter || ""} onUpdateResults={setTotalResults} />
            </div>
        </section>
    );
}
