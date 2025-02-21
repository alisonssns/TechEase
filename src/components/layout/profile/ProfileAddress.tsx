import { Link } from 'react-router-dom'
import styles from '../../styles/Profile.module.css'
import { useUser } from '../../contexts/UserContext'

function ProfileAddress() {
    const { endereco, user } = useUser()

    return (<>
        <h3>Endereço do Usuario</h3>
        <div className={styles.rowHolder}>
            <div className={styles.userInfo}>
                <b>{user?.nomeCompleto}</b>
            </div>
            {endereco ? (
                <div className={styles.address}>
                    <div>
                        <p><b>CEP:</b> {endereco.cep}</p>
                        <p><b>Cidade:</b> {endereco.localidade} - {endereco.uf}</p>
                    </div>
                    <div>
                        <p><b>Logradouro:</b> {endereco.logradouro}, {endereco.numero}</p>
                        <p><b>Bairro:</b> {endereco.bairro}</p>
                    </div>
                    <div>
                        <p><b>Estado:</b> {endereco.estado}</p>
                        <p><b>Tipo:</b> {endereco.tipo}</p>
                    </div>
                        {endereco.complemento && <p><b>Complemento:</b> {endereco.complemento}</p>}
                        <Link to={"/addressform"}><button>Alterar Endereço</button></Link>
                </div>
            ) : (
                <div className={styles.empty}>
                    <p className='title'>Você ainda não tem um endereço cadastrado</p>
                    <Link to={"/addressform"}><b>Cadastar endereço agora!</b></Link>
                </div>
            )
            }
        </div>
    </>
    )
}

export default ProfileAddress