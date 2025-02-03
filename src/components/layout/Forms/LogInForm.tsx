import styles from '../../styles/Forms.module.css';
import InputsHolder from '../inputs/InputsHolder';
import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import axios from "axios";

interface LoginFormProps {
    switch: () => void;
}

function LoginForm({ switch: handleSwitch }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        axios
            .post("http://localhost:5000/api/login", { email, senha })
            .then(() => {
                alert("Usuário encontrado com sucesso!");
                setEmail("");
                setSenha("");
                navigate("/home");

            })
            .catch((error) => {
                alert(`Erro ao logar. ${error}`);
            });
    };


    const fields = [
        { type: 'email', name: 'email', placeholder: 'E-mail', value: email, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value) },
        { type: 'password', name: 'senha', placeholder: 'Senha', value: senha, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value) }
    ];

    return (
        <form onSubmit={handleSubmit}>
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
