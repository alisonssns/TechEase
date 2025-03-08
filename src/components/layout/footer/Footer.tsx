import { Link } from 'react-router-dom';
import styles from '../../styles/Footer.module.css';

export default function Footer() {
    return (
        <footer>
            <div className={styles.topSection}>
                <div className={styles.column}>
                    <h2>TechEase<b>.</b></h2>
                    <i>Conectando você ao futuro tecnológico!</i>
                </div>
                <div className={styles.column}>
                    <h2>Compras</h2>
                    <ul>
                        <Link to={'/search/?filter=Pc&orderFilter=0'}><li>Computadores</li></Link>
                        <Link to={'/search/?filter=Acessorios&orderFilter=0'}><li>Acessórios</li></Link>
                        <Link to={'/search/?filter=Cadeira&orderFilter=0'}><li>Cadeiras</li></Link>
                        <Link to={'/search/?filter=Monitor&orderFilter=0'}><li>Telas</li></Link>
                    </ul>
                </div>
                <div className={styles.column}>
                    <h2>Links</h2>
                    <ul>
                        <Link to={'https://w.app/8ktjox'} target="_blank" rel="noopener noreferrer"> <li>Contate-nos</li></Link>
                        <Link to={'./aboutus'}><li>Sobre nós</li></Link>
                        <Link to={''}><li>Designs</li></Link>
                        <Link to={'https://github.com/alisonssns'} target="_blank" rel="noopener noreferrer">  <li>GitHub</li></Link>
                    </ul>
                </div>
                <div className={styles.column}>
                    <h2>Notificações</h2>
                    <p>Insira seu email para receber notificações sobre nossos produtos e promoções.</p>
                </div>
            </div>
            <div className={styles.bottomSection}>
                <p>&copy; 2025 <b>TechEase.</b> Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}
