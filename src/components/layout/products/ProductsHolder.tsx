import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Produto } from './Product';
import ProductCard from './ProductCard';
import styles from '../../styles/Products.module.css'

function Produtos({cat_prod} : {cat_prod : string}) {
  const [Produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const url = cat_prod 
      ? `http://localhost:5000/api/produtos?categoria=${cat_prod}` 
      : 'http://localhost:5000/api/produtos';

    axios.get<Produto[]>(url)
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
    <section className={styles.products}>
      <h1>Produtos Mais Vendidos</h1>
      <h2>Confira os itens mais populares entre nossos clientes</h2>
      <section className={styles.productHolder}>
        {Produtos.map(produto => (
          <ProductCard key={`Produto ${produto.id_prod}`} id={produto.id_prod} nome={produto.nome_prod} valor={produto.valor_prod} desc_home={produto.desc_prod_home} img={produto.img_prod} />
        ))}
      </section>
    </section>
  );
}

export default Produtos;
