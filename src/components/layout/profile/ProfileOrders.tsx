import { useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import styles from '../../styles/Orders.module.css'
import Orders from '../orders/Orders'

function ProfileOrders() {
    const { pedidos } = useUser()
    const [selected , setSelected] = useState<Number>()

    return (
        <>
            <h3>Dados do Usuario</h3>
            {pedidos.map((pedido, index) => (
                <div className={selected === index ? styles.orderRowHolderSelected : styles.orderRowHolder} key={pedido.id} onClick={() => setSelected(index)}>
                    <div className={styles.info}>
                        <h3>ID: {pedido.id}</h3>
                        <h3>Data: {(pedido.data).substring(0,10)}</h3>
                        <i>Status: <b>{pedido.status}</b></i>
                        <i>SubTotal: R${pedido.valor_total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</i>
                    </div>
                    <Orders orderId={pedido.id} key={pedido.id} />
                </div >
            ))}
        </>
    )
}

export default ProfileOrders