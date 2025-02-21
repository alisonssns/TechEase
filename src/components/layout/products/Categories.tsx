import { useNavigate } from 'react-router-dom'
import styles from '../../styles/Categories.module.css'
import { FaComputerMouse as Computer, FaTv as Monitor, FaMicrochip as Misc, FaHardDrive as Hardware } from 'react-icons/fa6'

function Categories() {
    const navigate = useNavigate();

    return (
        <section className={styles.categories}>
            <h2>Descubra mais Produtos</h2>
            <section className={styles.categoriesHolder}>
                <div className={styles.category_card} onClick={()=>navigate(`/search/Dispositivos/0`)}>
                    <Computer />
                    Dispositivos
                </div>
                <div className={styles.category_card} onClick={()=>navigate(`/search/Monitores/0`)}>
                    <Monitor />
                    Monitores
                </div>
                <div className={styles.category_card} onClick={()=>navigate(`/search/Acessorios/0`)}>
                    <Misc />
                    Acessorios
                </div>
                <div className={styles.category_card} onClick={()=>navigate(`/search/Hardware/0`)}>
                    <Hardware />
                    Hardwares
                </div>
            </section>
        </section>
    )
}

export default Categories