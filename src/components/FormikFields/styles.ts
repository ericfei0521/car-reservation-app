import styled from "styled-components"

export const InputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    .label {
        font-size: ${({ theme }) => theme.textScale.h3};
    }
    input {
        width: 100%;
        border: 1.5px solid ${({ theme }) => theme.border.disable};
        padding: 8px;
        box-sizing: border-box;
        border-radius: 4px;
        font-size: ${({ theme }) => theme.textScale.h3};
        &:focus {
            border-color: ${({ theme }) => theme.border.normal};
        }
        &:disabled {
            color: ${({ theme }) => theme.color.disable};
        }
        &.error {
            border-color: ${({ theme }) => theme.border.error};
        }
    }
    .err-msg {
        font-size: ${({ theme }) => theme.textScale.small};
        color: ${({ theme }) => theme.color.error};
    }
`
export const TextAreaContainer = styled(InputContainer)`
    .textarea-input-container {
        width: 100%;
        display: flex;
        height: fit-content;
        border: 1px solid ${({ theme }) => theme.border.disable};
        padding: 8px;
        max-height: 300px;
        overflow-y: auto;
        box-sizing: border-box;
        border-radius: 4px;
        &:focus {
            border-color: ${({ theme }) => theme.border.normal};
        }
        &:disabled {
            color: ${({ theme }) => theme.color.disable};
        }
        &.error {
            border-color: ${({ theme }) => theme.border.error};
        }
        textarea {
            width: 100%;
            height: 100px;
            border: none;
            resize: none;
            overflow-y: hidden;
            padding: 0;
            outline: none;
            background-color: transparent;
            font-size: ${({ theme }) => theme.textScale.h3};
            font-family: inherit;
        }
    }
`

interface ButtonProps {
    mode: "light" | "dark"
}
export const Button = styled.button<ButtonProps>`
    width: 100%;
    height: 50px;
    font-size: ${({ theme }) => theme.textScale.h3};
    border: 1px solid ${({ theme }) => theme.border.normal};
    border-radius: 4px;
    background-color: ${({ mode }) => (mode === "dark" ? "#4b5c6b" : "white")};
    color: ${({ mode, theme }) =>
        mode === "dark" ? "white" : theme.color.normal};
    font-weight: 700;
    &:active {
        box-shadow: 1px 1px 5px ${({ theme }) => theme.color.secondary};
    }
`
