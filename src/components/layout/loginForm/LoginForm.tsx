import styles from '../Forms.module.css';
import InputsHolder from '../Inputs/InputsHolder';
import OtherLogins from './OtherLogins';

import React, { useState } from "react";
import axios from "axios";

function LoginForm({ name, submit }: { name: string, submit: string }) {
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
            <div className={styles.login}>
                <div className={styles.title}>{name}</div>
                <div className={styles.holder}>
                    <div className={styles.inputs}>
                        <InputsHolder fields={fields} />
                    </div>
                    <input type="submit" value={submit} />
                </div>
            </div>
            <OtherLogins />
        </form>
    );
}

export default LoginForm;
