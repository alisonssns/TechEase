import { Link } from 'react-router-dom'
import styles from '../../styles/Profile.module.css'

function ProfileAddress() {
    return (
        <div className={styles.rowHolder}>
            <div className={styles.empty}>
                <p className='title'>Você ainda não tem um endereço cadastrado</p>
                <Link to={"/adressform"}><b>Cadastar endereço agora!</b></Link>
            </div>
        </div>
    )
}

export default ProfileAddress