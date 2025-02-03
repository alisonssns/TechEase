import { FaUser, FaExclamation, FaPowerOff, FaQuestion } from "react-icons/fa6";
import styles from '../../styles/Header.module.css'

function HeaderMenu() {
    return (
        <div className={styles.menu}>
            <div>
                <FaUser className={styles.menuImg}/>
                Perfil
            </div>
            <div>
                <FaExclamation className={styles.menuImg}/>
                Sobre nós
            </div>
            <div>
                <FaPowerOff className={styles.menuImg}/>
                Ajuda
            </div>
            <div>
                <FaQuestion className={styles.menuImg}/>
                Sair
            </div>
        </div>
    )
}

export default HeaderMenu;