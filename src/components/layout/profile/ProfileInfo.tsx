import styles from '../../styles/Profile.module.css'
import LinkRow from './LinkRow'

function ProfileInfo() {
    return (
        <>
            <h3>Dados do Usuario</h3>
            <div className={styles.rowHolder}>
                <LinkRow name="Usuario" content="Alisson Cordeiro" dest="userName" />
                <LinkRow name="Email" content="Alisson Cordeiro" dest="userName" />
            </div>

            <div className={styles.rowHolder}>
                <LinkRow name="Nome Completo" content="Alisson Cordeiro" dest="userName" />
                <LinkRow name="Apelido" content="Alisson Cordeiro" dest="userName" />
                <LinkRow name="Documento" content="Alisson Cordeiro" dest="userName" />
                <LinkRow name="Telefone" content="Alisson Cordeiro" dest="userName" />
            </div>
        </>
    )
}

export default ProfileInfo