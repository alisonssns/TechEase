import { useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import styles from '../../styles/Profile.module.css'
import LinkRow from './LinkRow'

function ProfileInfo() {
    const { user } = useUser()
    const [selected, setSelected] = useState<number>()

    return (
        <>
            <h3>Dados do Usuario</h3>
            <div className={styles.rowHolder}>
                <LinkRow name="Usuario" type='nome' content={user?.nome || "Não definido"} id={1} selected={selected ?? -1} onclick={(id) => setSelected(id)}/>
            </div>

            <div className={styles.rowHolder}>
                <LinkRow name="Nome Completo" type='nomeCompleto' content={user?.nomeCompleto || "Não definido"} id={2} selected={selected ?? -1} onclick={(id) => setSelected(id)}/>
                <LinkRow name="Apelido" type='apelido' content={user?.apelido || "Não definido"} id={3} selected={selected ?? -1} onclick={(id) => setSelected(id)}/>
                <LinkRow name="Documento" type='cpf' min={11} max={11} content={user?.cpf || "Não definido"} id={4} selected={selected ?? -1} onclick={(id) => setSelected(id)}/>
                <LinkRow name="Telefone" type='telefone' min={8} max={9} content={user?.telefone || "Não definido"} id={5} selected={selected ?? -1} onclick={(id) => setSelected(id)}/>
            </div>
        </>
    )
}

export default ProfileInfo