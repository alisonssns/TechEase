import { useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import { FaArrowRight } from 'react-icons/fa6'
import styles from '../../styles/Profile.module.css'
import LinkRow from './LinkRow'
import { Link } from 'react-router-dom'

function ProfileSecurity() {
    const { user } = useUser()
    const [selected, setSelected] = useState<number>()

    return (
        <>
            <h3>Segurança</h3>
            <div className={styles.rowHolder}>
                <LinkRow name="E-mail" type='email' content={user?.email || "Não definido"} id={6} selected={selected ?? -1} onclick={(id) => setSelected(id)} />
                <Link to="" className={styles.linkRow}>Alterar senha <FaArrowRight className={styles.arrow}/></Link>
                <Link to="" className={styles.linkRow}>Contato ao Suporte <FaArrowRight className={styles.arrow}/></Link>
                <Link to="" className={styles.linkRow} >Termos de Serviço <FaArrowRight className={styles.arrow}/></Link>
                <Link to="" className={styles.linkRow}>Política de Privacidade <FaArrowRight className={styles.arrow}/></Link>
                <Link to="" className={styles.linkRow}>Solicitar Exclusão de conta <FaArrowRight className={styles.arrow}/></Link>
            </div>
        </>
    )
}

export default ProfileSecurity