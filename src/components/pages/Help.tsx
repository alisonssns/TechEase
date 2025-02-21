import axios from 'axios'
import styles from '../styles/Help.module.css'
import { FaAngleRight as Arrow } from 'react-icons/fa6'
import { useEffect, useState } from 'react'

interface Duvida {
    id: number;
    nome: string;
    resposta: string;
}

function Help() {
    const [duvidas, setDuvidas] = useState<Duvida[]>([])
    const [selected, setSelected] = useState<Number>()

    useEffect(() => {
        axios.get<Duvida[]>('http://localhost:5000/api/getQuestions')
            .then((response) => {
                setDuvidas(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }), []

    return (
        <section className={styles.help}>
            <h3>Com qual tema você quer ajuda?</h3>
            <div className={styles.questions}>
                {duvidas.map((duvida) => (
                    <div className={styles.questionRow} onClick={() => setSelected(duvida.id)} key={duvida.id}>
                        <div className={styles.row}><h3>{duvida.nome}</h3> <Arrow /></div>
                        <div className={selected == duvida.id ? styles.selected : styles.answer}><p>{duvida.resposta}</p></div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Help