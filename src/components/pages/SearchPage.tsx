import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../layout/header/SearchBar";
import ProductsHolder from "../layout/products/ProductsHolder";
import styles from "../styles/SearchPage.module.css";

function SearchPage() {
    const { filter, orderFilter } = useParams();
    const [totalResults, setTotalResults] = useState(0);
    const [order, setOrder] = useState(orderFilter || "");
    const navigate = useNavigate();  
    console.log(orderFilter)

    const apply = () =>{
        navigate(`/search/${filter}/${order}`)
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
                <ProductsHolder filter={filter || ""}  order={orderFilter || ""} onUpdateResults={setTotalResults} />
            </div>
        </section>
    );
}

export default SearchPage;
