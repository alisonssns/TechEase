import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react';
import styles from '../../styles/Header.module.css'
import SearchBar from './SearchBar'
import { BiSolidHome as Home, BiSolidCart as Cart, BiMenu as Menu } from 'react-icons/bi'
import HeaderMenu from './HeaderMenu';
import { useCart } from '../../contexts/CartContext';

function Header() {
    const navigation = useNavigate();
    const { carrinho } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const iconRef = useRef<HTMLDivElement | null>(null); // Ref para o ícone do menu

    const handleClick = (route: string) => {
        navigation(route);
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current && !menuRef.current.contains(event.target as Node) &&
                iconRef.current && !iconRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <header>
            <section>
                <h2 onClick={() => handleClick('/home')}>TechEase</h2>
                <SearchBar type='headerSearch' />
                <div className={styles.links}>
                    <Home onClick={() => handleClick('/home')} />
                    <label className={styles.cart} onClick={() => handleClick('/cart')}>
                        <Cart />
                        {carrinho.length > 0 && <b>+{carrinho.length}</b>}
                    </label>
                    <div style={{display: 'flex'}} ref={iconRef}>
                        <Menu onClick={toggleMenu} />
                    </div>
                    {menuOpen && (
                        <div className={styles.menu} ref={menuRef}>
                            <HeaderMenu key="menu" />
                        </div>
                    )}
                </div>
            </section>
        </header>
    );
}

export default Header;
