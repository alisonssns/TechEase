import { useUser } from '../../contexts/UserContext'
import styles from '../../styles/Profile.module.css'
import LinkRow from './LinkRow'

function ProfileSecurity() {
    const { user } = useUser()

    return (
        <>
            <h3>Segurança</h3>
            <div className={styles.rowHolder}>
                <LinkRow name="E-mail" content={user?.email || "Não definido"} dest="userName" />
                <LinkRow name="Alterar senha" dest="userName" />
                <LinkRow name="Contato ao Suporte" dest="userName" />
                <LinkRow name="Termos de Serviço" dest="termsOfService" />  
                <LinkRow name="Política de Privacidade" dest="privacyPolicy" />
                <LinkRow name="Solicitar Exclusão de conta" dest="userName" />
            </div>
        </>
    )
}

export default ProfileSecurity