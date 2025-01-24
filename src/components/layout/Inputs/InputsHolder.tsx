import styles from '../Forms.module.css';

interface InputFieldProps {
    type: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputsHolder({ fields }: { fields: InputFieldProps[] }) {
    return (
        <>
            {fields.map((field) => (
                <div key={field.name}>
                    <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={field.value}
                        placeholder={field.placeholder}
                        onChange={field.onChange}
                        required
                    />
                    <label htmlFor={field.name} className={styles.sobe}>{field.placeholder}</label>
                </div>
            ))}
        </>
    );
}

export default InputsHolder;