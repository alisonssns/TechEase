import { useEffect, useState } from 'react';
import axios from 'axios';
import { Produto } from '../../interfaces/Product';
import ProductCard from './ProductCard';
import styles from '../../styles/Products.module.css'

function Produtos() {
  const [Produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get<Produto[]>('http://localhost:5000/api/produtos?order=0&limit=4')
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
        <ProductCard
          key={produto.id_prod}
          produto={produto}
        />
      ))}
    </section>
  );
}

export default Produtos;
