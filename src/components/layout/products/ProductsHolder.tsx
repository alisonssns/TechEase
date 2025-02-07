import { useEffect, useState } from "react";
import axios from "axios";
import { Produto } from "./Product";
import ProductCard from "./ProductCard";
import styles from "../../styles/Products.module.css";

interface ProductsHolderProps {
    filter?: string;
    order?: string;
    limit?: string;
    onUpdateResults?: (count: number) => void;
}

function ProductsHolder({ filter, order, limit, onUpdateResults }: ProductsHolderProps) {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const url = `http://localhost:5000/api/produtos?filter=${filter || ''}&order=${order|| ''}&limit=${limit || ''}`;

        axios
            .get<Produto[]>(url)
            .then((response) => {
                setProdutos(response.data);
                onUpdateResults?.(response.data.length);
            })
            .catch((error) => {
                console.error("Erro ao buscar dados:", error);
                onUpdateResults?.(0);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [filter, order, onUpdateResults]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <section className={styles.productHolder}>
            {produtos.length > 0 ? (
                produtos.map((produto) => (
                    <ProductCard
                        key={produto.id_prod}
                        produto={produto}
                    />
                ))
            ) : (
                <p>Nenhum produto encontrado.</p>
            )}
        </section>
    );
}

export default ProductsHolder;
