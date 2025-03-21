import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react';
import styles from '../../styles/Header.module.css'
import SearchBar from './SearchBar'
import { BiSolidHome as Home, BiSolidCart as Cart, BiMenu as Menu } from 'react-icons/bi'
import HeaderMenu from './HeaderMenu';
import { useUser } from '../../contexts/UserContext';

export default function Header() {
    const navigate = useNavigate();
    const { carrinho } = useUser();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const iconRef = useRef<HTMLDivElement | null>(null); // Ref para o ícone do menu

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
                <h2 onClick={() => navigate('/home')}>TechEase</h2>
                <SearchBar type='headerSearch' />
                <div className={styles.links}>
                    <Home onClick={() => navigate('/home')} />
                    <label className={styles.cart} onClick={() => navigate('/cart')}>
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
