import { useUser } from '../../contexts/UserContext'
import styles from '../../styles/Profile.module.css'
import LinkRow from './LinkRow'

function ProfileInfo() {
    const { user } = useUser()

    return (
        <>
            <h3>Dados do Usuario</h3>
            <div className={styles.rowHolder}>
                <LinkRow name="Usuario" content={user?.nome || "Não definido"} dest="userName" />
            </div>

            <div className={styles.rowHolder}>
                <LinkRow name="Nome Completo" content={user?.nomeCompleto || "Não definido"} dest="userName" />
                <LinkRow name="Apelido" content={user?.apelido || "Não definido"} dest="userName" />
                <LinkRow name="Documento" content={user?.cpf || "Não definido"} dest="userName" />
                <LinkRow name="Telefone" content={user?.telefone || "Não definido"} dest="userName" />
            </div>
        </>
    )
}

export default ProfileInfo