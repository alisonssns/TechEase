import styles from '../Forms.module.css'
import InputsHolder from '../Inputs/InputsHolder';

function LoginForm() {
    const fields = [
        { type: "text", name: "name", placeholder: "Nome" },
        { type: "text", name: "email", placeholder: "E-mail" },
        { type: "password", name: "password", placeholder: "Senha" },
    ];

    return (
        <section>
            <div className={styles.login}>
                <div className={styles.title}>CADASTRO</div>
                <div className={styles.holder}>
                    <div className={styles.inputs}>
                        <InputsHolder fields={fields} />
                    </div>
                    <div className={styles.finl}>
                        <input type="submit" value="CADASTRAR" id="sub" />
                    </div>
                </div>
            </div>
        </section>
    );
}


export default LoginForm
