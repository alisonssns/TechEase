import { FaUser, FaExclamation, FaPowerOff, FaQuestion } from "react-icons/fa6";
import styles from '../../styles/Header.module.css'
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

function HeaderMenu() {
    const { logout } = useUser()
    const navigation = useNavigate()

    const handleClick = (route: string) => {
        navigation(route);
    }

    return (
        <>
            <div onClick={() => handleClick('/profile')}>
                <FaUser className={styles.menuImg} />
                Perfil
            </div>
            <div>
                <FaExclamation className={styles.menuImg} />
                Sobre nós
            </div>
            <div>
                <FaPowerOff className={styles.menuImg} />
                Ajuda
            </div>
            <div onClick={() => logout()}>
                <FaQuestion className={styles.menuImg} />
                Sair
            </div>
        </>

    )
}

export default HeaderMenu;