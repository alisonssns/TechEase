import styles from '../../styles/Footer.module.css';

function Footer() {
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
                        <li>Computadores</li>
                        <li>Acessórios</li>
                        <li>Cadeiras</li>
                        <li>Telas</li>
                    </ul>
                </div>
                <div className={styles.column}>
                    <h2>Links</h2>
                    <ul>
                        <li>Contate-nos</li>
                        <li>Sobre nós</li>
                        <li>Designs</li>
                        <li>GitHub</li>
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

export default Footer;
