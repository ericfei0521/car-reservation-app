import React, { ReactNode } from "react"
import { Button } from "./FormikFields"
import styled from "styled-components"

type FontType = "h1" | "h2" | "h3" | "normal" | "small"
const TextBlock = styled.div<{ type: FontType }>`
    font-size: ${({ type, theme }) => theme.textScale[type]};
    font-weight: 700;
    line-height: 1.5;
`
interface TextProps {
    text: string
    type?: FontType
    className?: string
}
const Text = ({ text, type = "normal", className }: TextProps): JSX.Element => (
    <TextBlock type={type} className={className}>
        {text}
    </TextBlock>
)

interface ModalProps {
    className?: string
    children: ReactNode
    open: boolean
    onClose: () => void
}

const Modal = ({
    className,
    children,
    open,
    onClose,
}: ModalProps): JSX.Element | null => {
    return (
        <div className={`${className} ${open ? "show" : ""}`} onClick={onClose}>
            <div className="content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
Modal.Text = Text
Modal.Button = Button

export default styled(Modal)`
    background-color: rgba(74, 84, 92, 0.75);
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    visibility: hidden;
    opacity: 0;
    transition: all 0.5s ease;

    .content {
        min-height: 25%;
        background-color: white;
        padding: 24px;
        transform: translateY(1000px);
        transition: transform 0.2s ease;
    }

    &.show {
        visibility: visible;
        opacity: 1;
        transition: all 0.5s ease;
        .content {
            transform: translateY(0px);
            transition: transform 0.2s ease;
        }
    }
`
