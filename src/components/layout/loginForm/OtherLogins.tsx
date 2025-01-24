import { BsFacebook as Facebook, BsGoogle as Google } from "react-icons/bs"
import styles from "./OtherLogins.module.css";

function OtherLogins() {
    return (
        <div className={styles.card}>
            <div className={styles.title}>Ou continue com</div>
            <div className={styles.logins}>
                <div className={styles.login}><Google /> Continuar com o google</div>
                <div className={styles.login}><Facebook /> Continuar com o facebook</div>
            </div>
        </div>
    )
}

export default OtherLogins