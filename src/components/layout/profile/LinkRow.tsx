import { useEffect, useRef, useState } from 'react';
import { FaArrowsRotate as Icon, FaCheck } from 'react-icons/fa6';
import styles from '../../styles/Profile.module.css';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';

interface linkRowInterface {
    id: number;
    type: string;
    name: string;
    min?: number;
    max?: number
    content: string;
    selected: number;
    onclick: (id: number) => void;
}

function LinkRow({ id, type, name, min, max, content, selected, onclick }: linkRowInterface) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { user, update } = useUser()
    const [updateInfo, setUpdateInfo] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            await axios.post("http://localhost:5000/api/updateUser", { info: updateInfo, type: type, idUser: user?.id });
            update()
            onclick(-1)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (selected === id && inputRef.current) {
            inputRef.current.focus();
        }
    }, [selected, id]);

    return (
        <form className={styles.linkRow} onSubmit={handleSubmit}>
            <h3>{name}</h3>
                <>
                    {selected === id ? (
                        <>
                            <input
                                ref={inputRef}
                                type="text"
                                className={styles.update}
                                defaultValue={content === "Não definido" ? '' : content}
                                onChange={(e) => setUpdateInfo(e.target.value)}
                                minLength={min && min}
                                maxLength={max && max}
                            />
                            <label>
                                <FaCheck className={styles.check} />
                                <input type="submit" className='hide' />
                            </label>
                        </>
                    ) : (
                        <label onClick={() =>  onclick(id)}>
                            <p>{content}</p>
                            <Icon className={styles.rotate} />
                        </label>
                    )}
                </>
        </form>
    );
}

export default LinkRow;
