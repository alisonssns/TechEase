import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Produto } from './Produto';

function Produtos(){
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
    <div>
      <h1>Lista de Produtos</h1>
      <ul>
        {Produtos.map(produto => (
          <li key={produto.id_prod}>
            {produto.nome_prod} - {produto.valor_prod}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Produtos;
