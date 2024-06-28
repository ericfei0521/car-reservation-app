import React, { useRef, useEffect, useState } from "react"
import { useField, useFormikContext } from "formik"
import { InputContainer, TextAreaContainer } from "./styles"

interface BaseInputProps {
    name: string
    placeholder: string
    label?: string
    disabled?: boolean
}

export const TextInput: React.FC<BaseInputProps> = ({
    name,
    placeholder,
    label,
    disabled,
}) => {
    const [field, meta] = useField(name)
    const { setFieldValue } = useFormikContext()
    const hasError = Boolean(meta.touched && meta.error)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(field.name as never, e.target.value)
    }

    return (
        <InputContainer>
            {label && <div className="label">{label}</div>}
            <input
                value={field?.value}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                disabled={disabled}
                className={hasError ? "error" : ""}
                autoComplete="off"
            />
            {hasError && <div className="err-msg">{meta.error}</div>}
        </InputContainer>
    )
}

export const TextAreaInput: React.FC<BaseInputProps> = ({
    name,
    placeholder,
    label,
    disabled,
}) => {
    const [field, meta] = useField(name)
    const { setFieldValue } = useFormikContext()
    const [isFocus, setIsFocus] = useState(false)
    const hasError = Boolean(meta.touched && meta.error)

    const handleChange = (value: string) => {
        setFieldValue(field.name as never, value)
    }
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const textAreaContainerRef = useRef<HTMLDivElement>(null)
    const isDecreasing = useRef(false)

    useEffect(() => {
        // textareaResize
        if (textAreaRef && textAreaRef.current)
            if (field.value && textAreaRef.current.scrollHeight !== 100) {
                if (isDecreasing.current)
                    textAreaRef.current.style.height = "auto"

                textAreaRef.current.style.height =
                    textAreaRef.current.scrollHeight + "px"
                isDecreasing.current = false
            } else if (!field.value)
                textAreaRef.current.style.height = 100 + "px"
    }, [field.value])

    useEffect(() => {
        if (isFocus && textAreaRef.current && textAreaContainerRef.current) {
            textAreaContainerRef.current.scrollTop =
                textAreaContainerRef.current.scrollHeight
            textAreaRef.current.selectionStart =
                textAreaRef.current.value.length
            textAreaRef.current.selectionEnd = textAreaRef.current.value.length
        }
    }, [isFocus])

    return (
        <TextAreaContainer>
            {label && <div className="label">{label}</div>}
            <div
                className={`textarea-input-container ${disabled ? "disabled" : ""} ${isFocus ? "focus" : ""} ${hasError ? "error" : ""}`}
                ref={textAreaContainerRef}
            >
                <textarea
                    name={name}
                    value={field.value}
                    placeholder={placeholder}
                    disabled={disabled}
                    ref={textAreaRef}
                    rows={1}
                    onFocus={() => {
                        setIsFocus(true)
                    }}
                    onBlur={() => {
                        setIsFocus(false)
                    }}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        if (e.target.value < field.value)
                            isDecreasing.current = true

                        handleChange(e.target.value)
                    }}
                    data-emoji-input="unicode"
                />
            </div>
            {hasError && <div className="err-msg">{meta.error}</div>}
        </TextAreaContainer>
    )
}

export { Button } from "./styles"
