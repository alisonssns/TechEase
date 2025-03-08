import { Link, Outlet } from 'react-router-dom'
import { FaUser as User, FaLock as Lock, FaMapLocation as Address, FaCartShopping as Cart } from 'react-icons/fa6'
import styles from '../styles/Profile.module.css'
import { useEffect, useState } from 'react'

export default function ProfilePage() {
    const path = window.location.pathname;
    const [selected, setSelected] = useState('')

    useEffect(() => {
        setSelected(path.substring(path.lastIndexOf('/') + 1))
    }),[path]

    return (
        <section className={styles.profilePage}>
            <div className={styles.profileNavBar}>
                <ul>
                    <Link to="info" className={selected === "info" || selected === '' ? styles.active : ''} ><li><User /> Conta</li></Link>
                    <Link to="security" className={selected === "security" ? styles.active : ''} ><li><Lock /> Segurança</li></Link>
                    <Link to="address" className={selected === "address" ? styles.active : ''} ><li><Address /> Endereço</li></Link>
                    <Link to="orders" className={selected === "orders" ? styles.active : ''} > <li><Cart /> Pedidos</li></Link>
                </ul>
            </div>
            <div className={styles.profileHolder}>
                <Outlet />
            </div>
        </section>
    )
}