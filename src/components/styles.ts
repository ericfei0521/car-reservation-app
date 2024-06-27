import styled from "styled-components"

export const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 8px;
    height: 100%;
    .title {
        text-align: center;
    }
    .subtext {
        color: ${({ theme }) => theme.color.secondary};
        font-weight: 400;
        @media screen and (min-width: 768px) {
            text-align: center;
        }
    }
    &.success {
        justify-content: center;
        align-items: center;
    }
`
