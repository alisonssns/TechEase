import { useNavigate } from 'react-router-dom'
import styles from '../../styles/Header.module.css'
import SearchBar from './SearchBar'
import { BiSolidHome as Home, BiSolidCart as Cart, BiMenu as Menu } from 'react-icons/bi'

function Header() {
    const navigation = useNavigate();

    const handleClick = (route: string) =>{
        navigation(route);
        window.location.reload();
    }

    return (
        <header>
            <section>
                <h2>TechEase</h2>
                <SearchBar />
                <div className={styles.links}>
                    <Home onClick={()=> handleClick('/Home')}/>
                    <Cart />
                    <Menu />
                </div>
            </section>
        </header>
    )
}

export default Header