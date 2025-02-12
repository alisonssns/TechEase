import { Link, Outlet } from 'react-router-dom'
import { FaUser as User, FaLock as Lock, FaMapLocation as Address, FaCartShopping as Cart} from 'react-icons/fa6'
import styles from '../styles/Profile.module.css'
import { useState } from 'react'

function ProfilePage() {
    const [selected, setSelected] = useState(0)

    return (
        <section className={styles.profilePage}>
            <div className={styles.profileNavBar}>
                <ul>
                    <Link to="info" className={selected == 0? styles.active : ''} onClick={()=>setSelected(0)}><li><User/> Conta</li></Link>
                    <Link to="security" className={selected == 1? styles.active : ''} onClick={()=>setSelected(1)}><li><Lock/> Segurança</li></Link>
                    <Link to="address" className={selected == 2? styles.active : ''} onClick={()=>setSelected(2)}><li><Address/> Endereço</li></Link>
                    <Link to="orders" className={selected == 3? styles.active : ''} onClick={()=>setSelected(3)}> <li><Cart/> Pedidos</li></Link>
                </ul>
            </div>
            <div className={styles.profileHolder}>
                <Outlet />
            </div>
        </section>
    )
}

export default ProfilePage