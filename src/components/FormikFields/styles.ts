import styled from "styled-components"

export const InputContainer = styled.div`
    width: 100%;
    input {
        width: 100%;
        border: 1px solid #d3dae0;
        padding: 4px;
        box-sizing: border-box;
        border-radius: 4px;
        &:focus {
            border-color: black;
        }
        &:disabled {
            color: gray;
        }
    }
`
export const TextAreaContainer = styled.div`
    width: 100%;
    .textarea-input-container {
        width: 100%;
        display: flex;
        height: fit-content;
        border: 1px solid #d3dae0;
        padding: 4px;
        max-height: 300px;
        overflow-y: auto;
        box-sizing: border-box;
        border-radius: 4px;
        &.disabled {
            color: gray;
        }
        &.focus {
            border-color: black;
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
        }
    }
`
