import styles from '../../styles/Profile.module.css'
import LinkRow from './LinkRow'

function ProfileSecurity() {
    return (
        <>
        <h3>Segurança</h3>
            <div className={styles.rowHolder}>
                <LinkRow name="E-mail" content="Alisson Cordeiro" dest="userName" />
                <LinkRow name="Senha" content="Alisson Cordeiro" dest="userName" />
                <LinkRow name="Contato ao Suporte" dest="userName" />
                <LinkRow name="Recuperação de conta" dest="userName" />
                <LinkRow name="Solicitar Exclusão de conta" dest="userName" />
            </div>
        </>
    )
}

export default ProfileSecurity