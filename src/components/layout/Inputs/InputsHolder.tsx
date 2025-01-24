import InputField from "./inputField";

function InputsHolder({ fields }: { fields: { type: string; name: string; placeholder: string }[] }) {
    return (
        <>
            {fields.map((field, index) => (
                <InputField
                    key={index}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                />
            ))}
        </>
    );
}

export default InputsHolder;