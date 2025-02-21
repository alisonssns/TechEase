import axios from 'axios'
import styles from '../styles/Address.module.css'
import { useEffect, useState } from 'react'
import { Address } from '../interfaces/Address'
import Terms from '../layout/forms/Terms'
import { useUser } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

function AddressForm() {
    const { user, endereco, update } = useUser()
    const [cep, setCep] = useState('');
    const [cpf, setCpf] = useState(user?.cpf || '');
    const [nomeCompleto, setNomeCompleto] = useState(user?.nomeCompleto || '');
    const [complemento, setComplemento] = useState('');
    const [tipo, setTipo] = useState('');
    const [error, setError] = useState('');
    const [number, setNumber] = useState('');
    const [telefone, setTelefone] = useState('');
    const [end, setEnd] = useState<Address | undefined>();
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (end && user) {
            const newAddress = {
                ...end,
                nomeCompleto,
                cpf: cpf.replace(/[.-]/g, ''),
                complemento,
                telefone: telefone.replace('-', ''),
                numero: parseInt(number),
                tipo,
            };

            const url = endereco ? "http://localhost:5000/api/addressUpdate" : "http://localhost:5000/api/addressRegister";

            axios.post((url), { newAddress, idUser: user.id })
                .then(() => {
                    update()
                    navigate('/profile')
                })
                .catch(error => {
                    console.error('Erro ao buscar dados:', error);
                });
        }
    };

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
        setTelefone(value)
    }

    useEffect(() => {
        if (cep.length === 9) {
            axios.get<Address>(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`)
                .then((result) => {
                    setEnd(result.data);
                    if (!result.data.uf) {
                        setError('Erro: UF não encontrada!');
                        setTimeout(() => setError(''), 500);
                    }
                })
                .catch(() => setEnd(undefined));
        }
    }, [cep]);

    return (
        <form className={styles.addressForm} onSubmit={handleSubmit}>
            <div className={styles.formSection}>
                <div className={styles.formHolder}>
                    <h2>Adicione um endereço</h2>

                    {!endereco && <div className={styles.row_type_1}>
                        <input type="text" autoComplete="off" placeholder='Nome Completo' required value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)} />
                        <input type="text" autoComplete="off" placeholder='CPF' minLength={14} maxLength={14} value={cpf} onChange={handleCpfChange} required />
                    </div>}
                    <div className={styles.row_type_2}>
                        <input type="text" autoComplete="off" placeholder='CEP' className={error ? 'shake' : ''} minLength={9} maxLength={9} value={cep} required onChange={handleCepChange} />
                        <input type="text" placeholder='Cidade' readOnly className={styles.disabled} value={end?.localidade ?? ""} required />
                    </div>
                    <input type="text" placeholder='Estado' readOnly className={styles.disabled} value={end?.uf ? `${end?.estado} (${end?.uf})` : ''} required />
                    <input type="text" placeholder='Bairro' readOnly className={styles.disabled} value={end?.bairro ?? ""} required />
                    <div className={styles.row_type_1}>
                        <input type="text" placeholder='Rua/Avenida' readOnly className={styles.disabled} value={end?.logradouro ?? ""} required />
                        <input type="number" placeholder='Numero' onChange={(e) => setNumber(e.target.value)} required />
                    </div>
                    <div className={styles.row_type_1}>
                        <input type="text" placeholder='Complemento (Opcional)' value={complemento} onChange={(e) => setComplemento(e.target.value)} />
                        {!endereco && <div className={styles.row_type_2}>
                            <input type="text" placeholder='DDD' maxLength={2} readOnly className={styles.disabled} value={end?.ddd ?? ""} style={{ textAlign: 'center', textIndent: '0' }} required />
                            <input type="text" autoComplete="off" placeholder='Telefone' value={telefone} minLength={9} maxLength={10} onChange={handleNumberChange} required />
                        </div>}
                    </div>
                    <div className={styles.addressType}>
                        <label><input type="radio" name="type" className='hide' required onChange={() => setTipo('Casa')} />Casa</label>
                        <label><input type="radio" name="type" className='hide' required onChange={() => setTipo('Trabalho')} />Trabalho</label>
                    </div>
                {endereco && <input type="submit" value="Atualizar" className='input1'/>}
                </div>
            </div>
            {!endereco && <div className={styles.termsSection}>
                <Terms />
            </div>}
        </form>
    );
}

export default AddressForm