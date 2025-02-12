import axios from 'axios'
import styles from '../styles/Address.module.css'
import { useEffect, useState } from 'react'
import { Address } from '../interfaces/Address'
import Terms from '../layout/forms/Terms'

function AddressForm() {
    const [cep, setCep] = useState('')
    const [cpf, setCpf] = useState('')
    const [error, setError] = useState('')
    const [number, setNumber] = useState('')
    const [end, setEnd] = useState<Address | undefined>()

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 5) {
            value = value.replace(/^(\d{5})(\d{1,3})$/, "$1-$2");
        }
        setCep(value);
    };

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 9) {
            value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, "$1.$2.$3-$4")
        }
        setCpf(value)
    }

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 4 && value.length < 9) {
            value = value.replace(/^(\d{4})(\d{1,4})$/, "$1-$2")
        } else if (value.length > 8) {
            value = value.replace(/^(\d{1})(\d{4})(\d{4})$/, "$1$2-$3")
        }
        setNumber(value)
    }

    useEffect(() => {
        if (cep.length === 9) {
            axios.get<Address>(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`)
                .then((result) => {
                    setEnd(result.data);
                    if (!result.data.uf) {
                        setError('Erro: UF não encontrada!');
                        setTimeout(() => {
                            setError('');
                        }, 500);
                    }
                })
                .catch(() => {
                    setEnd(undefined);
                });
        }
    }, [cep]);

    return (
        <form className={styles.adressForm}>
            <div className={styles.formSection}>
                <div className={styles.formHolder}>
                    <h2>Adicione um endereço</h2>

                    <div className={styles.row_type_1}>
                        <input type="text" placeholder='Nome Completo' required />
                        <input type="text" placeholder='CPF' minLength={14} maxLength={14} value={cpf} onChange={handleCpfChange} required />
                    </div>
                    <div className={styles.row_type_2}>
                        <input type="text" placeholder='CEP' className={error ? styles.shake : ''} minLength={9} maxLength={9} value={cep} required onChange={handleCepChange} />
                        <input type="text" placeholder='Cidade' disabled value={end?.localidade ?? ""} required />
                    </div>
                    <input type="text" placeholder='Estado' disabled value={end?.uf ? `${end?.estado} (${end?.uf})` : ''} required />
                    <input type="text" placeholder='Bairro' disabled value={end?.bairro ?? ""} required />
                    <div className={styles.row_type_1}>
                        <input type="text" placeholder='Rua/Avenida' disabled value={end?.logradouro ?? ""} required />
                        <input type="number" placeholder='Numero' required />
                    </div>
                    <div className={styles.row_type_1}>
                        <input type="text" placeholder='Complemento (Opcional)' />
                        <div className={styles.row_type_2}>
                            <input type="text" placeholder='DDD' maxLength={2} disabled value={end?.ddd ?? ""} style={{ textAlign: 'center', textIndent: '0' }} required />
                            <input type="text" placeholder='Telefone' value={number} minLength={9} maxLength={10} onChange={handleNumberChange} required />
                        </div>
                    </div>
                    <div className={styles.addressType}>
                        <label><input type="radio" name="type" className='hide' required />Casa</label>
                        <label><input type="radio" name="type" className='hide' required />Trabalho</label>
                    </div>
                </div>
            </div>
            <div className={styles.termsSection}>
                <Terms />
            </div>
        </form>
    )
}

export default AddressForm
