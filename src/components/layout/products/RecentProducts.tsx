import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Produto } from './Product';
import ProductCard from './ProductCard';
import styles from '../../styles/Products.module.css'

function Produtos() {
  const [Produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get<Produto[]>('http://localhost:5000/api/recentes')
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
      <section className={styles.RecentProductHolder}>
        {Produtos.map(produto => (
          <ProductCard key={`Produto ${produto.id_prod}`} id={produto.id_prod} nome={produto.nome_prod} valor={produto.valor_prod} desc_home={produto.desc_prod_home} img={produto.img_prod} />
        ))}
      </section>
  );
}

export default Produtos;
