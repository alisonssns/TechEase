import styles from '../../styles/Forms.module.css';
import InputsHolder from '../inputs/InputsHolder';
import { useNavigate } from "react-router-dom";
import { useUser } from '../../contexts/UserContext';
import React, { useState } from "react";

interface LoginFormProps {
    switch: () => void;
}

function LoginForm({ switch: handleSwitch }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState(false);
    const { login, user } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setError(false);

        try {
            const success = await login(email, senha);
            if (success) {
                navigate('/home');
            } else {
                setTimeout(() => setError(true), 10);
            }
        } catch (err) {
            setTimeout(() => setError(true), 10);
        }
    };

    const fields = [
        { type: 'email', name: 'email', placeholder: 'E-mail', value: email, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value) },
        { type: 'password', name: 'senha', placeholder: 'Senha', value: senha, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value) }
    ];

    return (
        <form onSubmit={handleSubmit} className={error ? styles.error : ''}>
            {error && <b className={styles.errorText}>Email ou senha inválidos</b>}
            <div className={styles.title}>{"Bem vindo de volta!"}</div>
            <div className={styles.inputs}>
                <InputsHolder fields={fields} />
            </div>
            <input type="submit" value={"ENTRAR"} />
            <u onClick={handleSwitch}>Ainda <b>não</b> tem uma conta?</u>
        </form>
    );
}

export default LoginForm;
