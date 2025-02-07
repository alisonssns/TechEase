import { useNavigate } from 'react-router-dom'
import styles from '../../styles/Header.module.css'
import SearchBar from './SearchBar'
import { BiSolidHome as Home, BiSolidCart as Cart, BiMenu as Menu } from 'react-icons/bi'
import HeaderMenu from './HeaderMenu';
import { useState } from 'react';
import { useCart } from '../cart/CartContext';

function Header() {
    const navigation = useNavigate();
    const {carrinho} = useCart();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleClick = (route: string) => {
        navigation(route);
    }

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <header>
            <section>
                <h2 onClick={() => handleClick('./home')}>TechEase</h2>
                <SearchBar type='headerSearch' />
                <div className={styles.links}>
                    <Home onClick={() => handleClick('/home')} />
                    <label className={styles.cart} onClick={() => handleClick('/cart')}>
                        <Cart />
                        {carrinho.length > 0 && <b>+{carrinho.length}</b>}
                    </label>
                    <Menu onClick={toggleMenu} />
                    {menuOpen && <HeaderMenu key="menu" />}
                </div>
            </section>
        </header>
    )
}

export default Header