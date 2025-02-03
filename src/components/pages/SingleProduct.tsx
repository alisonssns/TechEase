import styles from '../styles/SingleProduct.module.css'
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Produto } from '../layout/products/Product';
import { useParams } from "react-router-dom";

function SingleProduct() {
    const { nome, id } = useParams();
    const [produto, setProduto] = useState<Produto | null>(null);
    const [showDescription, setShowDescription] = useState(true);

    useEffect(() => {
        axios.post<Produto>('http://localhost:5000/api/produtoEscolhido', { id })
            .then(response => {
                setProduto(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
            });
    }, []);

    const toggleDescription = useCallback((isDescription: boolean) => {
        setShowDescription(isDescription);
    }, []);

    if (!produto) {
        return <p>Carregando...</p>;
    }

    return (
        <section className={styles.product}>
            <div className={styles.imageSection}>
                <img src={`/products/${produto.img_prod}`} alt={nome} />
            </div>
            <div className={styles.infoSection}>
                <h1>{nome}</h1>
                <div className={styles.prices}>
                    <del>R$ {produto.valor_prod.toFixed(2)}</del>
                    <div>
                        <b>R$ {(produto.valor_prod * 0.8).toFixed(2)}</b>
                        <i>{produto.cat_prod}</i>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button onClick={() => toggleDescription(true)} className={showDescription ? styles.selected : styles.normal}>Descrição</button>
                    <button onClick={() => toggleDescription(false)} className={showDescription ? styles.normal : styles.selected}>Especificações</button>
                </div>
                <div className={styles.textHolder}>
                    {showDescription ? produto.desc_prod : produto.espec_prod}
                </div>
                <input type="submit" value="Adicionar ao Carrinho" />
            </div>
        </section>
    );
}

export default SingleProduct;
