import { FaUser, FaExclamation, FaPowerOff, FaQuestion } from "react-icons/fa6";
import styles from '../../styles/Header.module.css'
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export default function HeaderMenu() {
    const { logout } = useUser()
    const navigate = useNavigate()

    return (
        <>
            <div onClick={() => navigate('/profile')}>
                <FaUser className={styles.menuImg} />
                Perfil
            </div>
            <div onClick={() => navigate('/aboutus')}>
                <FaExclamation className={styles.menuImg}/>
                Sobre nós
            </div>
            <div onClick={() => navigate('/help')}>
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