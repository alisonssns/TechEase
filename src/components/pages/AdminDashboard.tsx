import styles from "../styles/AdminDashboard.module.css"
import { MdDashboard as Dashboard } from "react-icons/md"
import { FaBoxOpen as Produtos, FaClipboardList as Pedidos, FaChartLine as Relatorios } from "react-icons/fa6"
import { IoPeopleSharp as Clientes } from "react-icons/io5"
import { Link, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"

export default function AdminDashboard() {
    const path = window.location.pathname;
    const [selected, setSelected] = useState('')

    useEffect(() => {
        setSelected(path.substring(path.lastIndexOf('/') + 1))
    }), [path]

    return (
        <section className={styles.dashboard}>
            <div className={styles.sideBar}>
                <h2>TechEase</h2>
                <div className={styles.routes}>
                    <Link to="dashboard" className={selected === "dashboard" ? styles.selected : ''}><Dashboard /> Dashboard</Link>
                    <Link to="products" className={selected === "products" ? styles.selected : ''}><Produtos /> Produtos</Link>
                    <Link to="orders" className={selected === "orders" ? styles.selected : ''}><Pedidos /> Pedidos</Link>
                    <Link to="clients" className={selected === "clients" ? styles.selected : ''}><Clientes /> Clientes</Link>
                    <Link to="reports" className={selected === "reports" ? styles.selected : ''}><Relatorios /> Relatórios</Link>
                </div>
                <div className={styles.sideBarOptions}>
                    <a href="">Suporte</a>
                    <a href="">Sair</a>
                </div>
            </div>
            <div className={styles.pageHolder}>
                <Outlet />
            </div>
        </section>
    )
}