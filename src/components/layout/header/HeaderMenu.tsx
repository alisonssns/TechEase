import { FaUser, FaExclamation, FaPowerOff, FaQuestion } from "react-icons/fa6";
import styles from '../../styles/Header.module.css'
import { useNavigate } from "react-router-dom";

function HeaderMenu() {
    const navigation = useNavigate()

    const handleClick = (route: string) => {
        navigation(route);
    }

    return (
        <div className={styles.menu}>
            <div onClick={()=>handleClick('/profile')}>
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