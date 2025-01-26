import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Produto } from './Produto';
import ProductCard from './ProductCard';
import styles from './Product.module.css'

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
        <ProductCard id={produto.id_prod} nome={produto.nome_prod} valor={produto.valor_prod} desc_home={produto.desc_prod_home} img='https://shopinfo.vteximg.com.br/arquivos/ids/1677075-1000-1000/1.png?v=638714979723800000' />
      ))}
    </section>
  );
}

export default Produtos;
