import { useNavigate } from 'react-router-dom'
import styles from '../../styles/Header.module.css'
import SearchBar from './SearchBar'
import { BiSolidHome as Home, BiSolidCart as Cart, BiMenu as Menu } from 'react-icons/bi'
import HeaderMenu from './HeaderMenu';
import { useState } from 'react';

function Header() {
    const navigation = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleClick = (route: string) =>{
        navigation(route);
        window.location.reload();
    }

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <header>
            <section>
                <h2 onClick={() => handleClick('./home')}>TechEase</h2>
                <SearchBar type='headerSearch'/>
                <div className={styles.links}>
                    <Home onClick={()=> handleClick('/home')}/>
                    <Cart />
                    <Menu onClick={toggleMenu}/>
                    {menuOpen && <HeaderMenu key="menu" />}
                </div>
            </section>
        </header>
    )
}

export default Header