import { useNavigate } from 'react-router-dom'
import styles from '../../styles/Categories.module.css'
import { FaComputerMouse as Computer, FaTv as Monitor, FaMicrochip as Misc, FaHardDrive as Hardware } from 'react-icons/fa6'
function Categories() {
    const Navigation = useNavigate();
    const handleClick = (categoria: string) =>{
        Navigation(`/Home/${categoria}`);
        window.location.reload();
    }

    return (
        <section className={styles.categories}>
            <h2>Descubra mais Produtos</h2>
            <section className={styles.categoriesHolder}>
                <div className={styles.category_card} onClick={()=>handleClick("Dispositivos")}>
                    <Computer />
                    Dispositivos
                </div>
                <div className={styles.category_card} onClick={()=>handleClick("Monitores")}>
                    <Monitor />
                    Monitores
                </div>
                <div className={styles.category_card} onClick={()=>handleClick("Acessorios")}>
                    <Misc />
                    Acessorios
                </div>
                <div className={styles.category_card} onClick={()=>handleClick("Hardware")}>
                    <Hardware />
                    Hardwares
                </div>
            </section>
        </section>
    )
}

export default Categories