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
