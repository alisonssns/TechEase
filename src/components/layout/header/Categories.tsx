import styles from '../../styles/Categories.module.css'
import { FaComputerMouse as Computer, FaTv as Monitor, FaMicrochip as Misc, FaHardDrive as Hardware } from 'react-icons/fa6'
function Categories() {
    return (
        <section className={styles.categories}>
            <div className={styles.category_card}>
                <Computer />
                Dispositivos
            </div>
            <div className={styles.category_card}>
                <Monitor />
                Monitores
            </div>
            <div className={styles.category_card}>
                <Misc />
                Acessorios
            </div>
            <div className={styles.category_card}>
                <Hardware />
                Hardwares
            </div>
        </section>
    )
}

export default Categories