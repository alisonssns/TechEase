import styles from '../../styles/Carrossel.module.css'
import { Produto } from '../products/Product';

import { useEffect, useState } from 'react';
import axios from 'axios';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carrossel() {
    const [Produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
      axios.get<Produto[]>('http://localhost:5000/api/random')
        .then(response => {
          setProdutos(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar dados:', error);
        });
    }, []);

    const settings = {
        infinite: true,
        speed: 500, 
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className={styles.carrossel}>
            <Slider {...settings}>
                {Produtos.map((produto) => (
                    <div key={produto.id_prod}>
                        <div className={styles.slider}>
                            <img 
                                src={`/products/${produto.Img_prod}`} 
                                alt={`Imagem do produto ${produto.nome_prod}`} 
                            />
                            <div className={styles.info}>
                                <div>
                                    <h1>{produto.nome_prod}</h1>
                                    <i>{produto.desc_prod_home}</i>
                                </div>
                                <div>
                                    <div className={styles.oldPrice}>DE <del>R$ {produto.valor_prod.toFixed(2)}</del></div>
                                    <div className={styles.newPrice}>POR R$ {(produto.valor_prod * 0.8).toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Carrossel;
