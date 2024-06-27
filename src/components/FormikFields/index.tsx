import React from "react"
import { useField, useFormikContext } from "formik"
import { InputContainer } from "./styles"

interface TextInputProps {
    name: string
    placeholder: string
    label?: string
    isDisabled?: boolean
}

export const TextInput: React.FC<TextInputProps> = ({
    name,
    placeholder,
    label,
    isDisabled,
}) => {
    const [field, meta] = useField(name)
    const { setFieldValue } = useFormikContext()
    const hasError = Boolean(meta.touched && meta.error)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(field.name as never, e.target.value)
    }

    return (
        <InputContainer>
            {label && <div>{label}</div>}
            <input
                value={field?.value}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                disabled={isDisabled}
            />
            {hasError && <div>{meta.error}</div>}
        </InputContainer>
    )
}
