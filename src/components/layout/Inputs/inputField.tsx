import styles from '../Forms.module.css'


function InputField({type, name, placeholder} : {type: string, name:string, placeholder:string}) {
    return (
        <div className={styles[name]}>
            <input type={type} id={name} placeholder={placeholder} required />
            <label htmlFor={name} className={styles.sobe}>{placeholder}</label>
        </div>
    );
}

export default InputField;