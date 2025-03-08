import axios from "axios";
import { useEffect, useState } from "react";
import { Produto } from "../../interfaces/Product";
import ProductCard from "../products/ProductCard";
import styles from "../../styles/Products.module.css"

export default function Recomendations() {
    const [Produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get<Produto[]>('http://localhost:5000/api/produtos?order=4&limit=4')
            .then(response => {
                setProdutos(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        < section className={styles.recomendations} >
            <h3>Produtos de seu interesse</h3>
            <div className={styles.holder}>
                {
                    Produtos.map(produto => (
                        <ProductCard
                            key={produto.id_prod}
                            produto={produto}
                        />
                    ))
                }
            </div>
        </section >
    );
}