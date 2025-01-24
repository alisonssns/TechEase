import styles from '../Forms.module.css';

interface InputFieldProps {
    type: string;
    name: string;
    placeholder: string;
    value: string;
}

function InputField({ type, name, placeholder, value, }: InputFieldProps) {
    return (
        <div className={styles[name]}>
            <input 
                type={type} 
                id={name} 
                name={name} 
                value={value}
                placeholder={placeholder} 
                required 
            />
            <label htmlFor={name} className={styles.sobe}>{placeholder}</label>
        </div>
    );
}

export default InputField;
