import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Produto } from './Produto';
import ProductCard from './ProductCard';
import styles from '../../styles/Product.module.css'

function Produtos() {
  const [Produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get<Produto[]>('http://localhost:5000/api/produtos')
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
    <section className={styles.productHolder}>
      {Produtos.map(produto => (
        <ProductCard id={produto.id_prod} nome={produto.nome_prod} valor={produto.valor_prod} desc_home={produto.desc_prod_home} img={produto.Img_prod} />
      ))}
    </section>
  );
}

export default Produtos;
