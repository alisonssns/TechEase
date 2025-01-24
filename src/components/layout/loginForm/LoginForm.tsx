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

        console.log(nome);
        console.log(email);
        console.log(senha);
    };


    const fields = [
        { type: 'text', name: 'nome', placeholder: 'Nome', value: nome,},
        { type: 'email', name: 'email', placeholder: 'E-mail', value: email},
        { type: 'password', name: 'senha', placeholder: 'Senha', value: senha}
    ];

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.login}>
                <div className={styles.title}>{name}</div>
                <div className={styles.holder}>
                    <div className={styles.inputs}>
                        <InputsHolder fields={fields}/>
                    </div>
                    <input type="submit" value={submit} />
                </div>
            </div>
            <OtherLogins />
        </form>
    );
}

export default LoginForm;
