import styles from '../styles/SingleProduct.module.css'
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Produto } from '../interfaces/Product';
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from '../contexts/UserContext';

export default function SingleProduct() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const nome = searchParams.get('nome');
    const id = searchParams.get('id');
    const [produto, setProduto] = useState<Produto | null>(null);
    const [showDescription, setShowDescription] = useState(true);
    const { gerenciarCarrinho } = useUser();
    const navigate = useNavigate();

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

    const addToCart = () => {
        gerenciarCarrinho(produto.id_prod, 0);
        navigate('/cart')
    }

    return (
        <section className={styles.product}>
            <div className={styles.imageSection}>
                <img src={`/products/${produto.img_prod}`} />
            </div>
            <div className={styles.infoSection}>
                <h1>{nome}</h1>
                <div className={styles.prices}>
                    <b>R$ {(produto.valor_prod * 1.3).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b>
                    <div>
                        <b>R$ {(produto.valor_prod).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b>
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
                <input type="submit" value="Adicionar ao Carrinho" onClick={addToCart} />
            </div>
        </section>
    );
}
