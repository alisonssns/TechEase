import axios from 'axios'
import { useEffect, useState } from 'react'
import { Produto } from '../../interfaces/Product'
import styles from '../../styles/Orders.module.css'

function Orders({ orderId }: { orderId?: number }) {
    const [produtos, setProdutos] = useState<Produto[]>([])

    useEffect(() => {
        axios.get<Produto[]>(`http://localhost:5000/api/orderProducts/?orderId=${orderId}`)
            .then((result) => {
                setProdutos(result.data)
            })
            .catch((err) => {
                console.log(err)
            })
    })

    return (
        <>
            {produtos.map((produto) => (
                <div className={styles.orderRow} key={`${orderId} & ${produto.id_prod}`}>
                    <img src={`/products/${produto.img_prod}`} alt={produto.nome_prod} />
                    <div className={styles.orderInfo}>
                        <h3>{produto.nome_prod}</h3>
                        <p>{produto.desc_prod_home}</p>
                    </div>
                    <div className={styles.orderInfo}>
                        <div>Quantidade: <b>{produto.quantidade}</b></div>
                        <p>R$ {(produto.valor_prod * produto.quantidade).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                </div>
            ))
            }
        </>
    )
}

export default Orders