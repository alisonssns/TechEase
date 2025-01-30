import styles from '../../styles/Forms.module.css';
import InputsHolder from '../inputs/InputsHolder';

import React, { useState } from "react";
import axios from "axios";

interface LoginFormProps {
    switch: () => void;
}

function LoginForm({ switch: handleSwitch }: LoginFormProps) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        axios
            .post("http://localhost:5000/api/register", { nome, email, senha })
            .then(() => {
                alert("Usuário cadastrado com sucesso!");
                setNome("");
                setEmail("");
                setSenha("");
            })
            .catch((error) => {
                alert(`Erro ao cadastrar o usuário. ${error}`);
            });
    };


    const fields = [
        { type: 'text', name: 'nome', placeholder: 'Nome', value: nome, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value) },
        { type: 'email', name: 'email', placeholder: 'E-mail', value: email, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value) },
        { type: 'password', name: 'senha', placeholder: 'Senha', value: senha, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value) }
    ];

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.title}>{"Crie sua Conta"}</div>
            <div className={styles.holder}>
                <div className={styles.inputs}>
                    <InputsHolder fields={fields} />
                </div>
                <input type="submit" value={"Criar Conta"} />
            </div>
            <u onClick={handleSwitch}>Já tem uma conta?</u>
        </form>
    );
}

export default LoginForm;
