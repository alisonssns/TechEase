import styles from '../../styles/Carrossel.module.css'
import { Produto } from '../../interfaces/Product';

import { useEffect, useState } from 'react';
import axios from 'axios';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

function Carrossel() {
    const [Produtos, setProdutos] = useState<Produto[]>([]);
    const Navigation = useNavigate();

    const handleClick = (name: string, id: number) => {
        Navigation(`/SingleProduct?nome=${name}&id=${id}`)
    }

    useEffect(() => {
        axios.get<Produto[]>('http://localhost:5000/api/produtos/?order=4&limit=5')
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
        arrows: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className={styles.carrossel}>
            <Slider {...settings}>
                {Produtos.map((produto) => (
                    <div key={produto.id_prod}>
                        <div className={styles.slider}>
                            <img onClick={() => handleClick(produto.nome_prod, produto.id_prod)}
                                src={`/products/${produto.img_prod}`}
                                alt={`Imagem do produto ${produto.nome_prod}`}
                            />
                            <div className={styles.info}>
                                <div>
                                    <h1>{produto.nome_prod}</h1>
                                    <i>{produto.desc_prod_home}</i>
                                </div>
                                <div>
                                    <div className={styles.oldPrice}>DE <del>R$ {(produto.valor_prod *1.3).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</del></div>
                                    <div className={styles.newPrice}>POR R$ {(produto.valor_prod).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
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
