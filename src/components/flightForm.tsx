import React, { useState, useRef } from "react"
import { Formik, Form, FormikProps } from "formik"
import { TextInput, TextAreaInput, Button } from "./FormikFields"
import Modal from "@/components/modal"
import { ModalContainer } from "./styles"
import styled from "styled-components"
import Image from "next/image"
import { fetchFlightData } from "@/services"
import * as yup from "yup"

interface FormValues {
    dpartureAirport: string
    flightNumber: string
    name: string
    phoneNumber: string
    idNumber: string
    note: string
}

const validationSchema = yup.object().shape({
    flightNumber: yup
        .string()
        .matches(/^[A-Za-z]{2}\d*$/, "請輸入正確的航班編號")
        .required("航班編號為必填項"),
    name: yup
        .string()
        .matches(/^[a-zA-Z\s]*$/, "姓名只能接受英文字符與空格")
        .required("姓名為必填項"),
    phoneNumber: yup
        .string()
        .matches(/^\d+$/, "電話只能接受數字")
        .required("電話為必填項"),
    idNumber: yup
        .string()
        .matches(/^[a-zA-Z0-9]*$/, "身份證字號/護照編號只能接受英文字符與數字")
        .required("身份證字號/護照編號為必填項"),
    note: yup.string().nullable(),
})

const initialValues: FormValues = {
    dpartureAirport: "桃園國際機場",
    flightNumber: "",
    name: "",
    phoneNumber: "",
    idNumber: "",
    note: "",
}
type ModalType = "success" | "action" | "error"

interface ModalInfo {
    show: boolean
    flightNum: string
    type: ModalType
    err?: string
}

interface FlightFormProps {
    className?: string
}
const FlightForm: React.FC<FlightFormProps> = ({ className }) => {
    const formRef = useRef<FormikProps<FormValues>>(null)
    const [isLoading, setIsloading] = useState(false)
    const [modalInfo, setModalInfo] = useState<ModalInfo>({
        show: false,
        flightNum: "",
        type: "action",
        err: "",
    })

    const handleSubmit = (values: FormValues) => {
        const airlineIDMatch = values.flightNumber.match(/^[A-Z]{2}/)
        const flightNumberMatch = values.flightNumber.match(/\d+$/)

        const airlineID: string | null = airlineIDMatch
            ? airlineIDMatch[0]
            : null
        const flightNumber: string | null = flightNumberMatch
            ? flightNumberMatch[0]
            : null
        setIsloading(true)
        if (airlineID && flightNumber)
            fetchFlightData({
                flightNumber: flightNumber,
                airlineID: airlineID,
                onSuccess: (data) => {
                    if (data && data.length > 0)
                        setModalInfo({
                            ...modalInfo,
                            type: "success",
                            show: true,
                        })
                    else
                        setModalInfo({
                            ...modalInfo,
                            flightNum: `${airlineID}${flightNumber}`,
                            type: "action",
                            show: true,
                        })

                    setIsloading(false)
                },
                onError: (err) => {
                    setModalInfo({
                        ...modalInfo,
                        type: "error",
                        show: true,
                        err: err || "",
                    })
                    setIsloading(false)
                },
            })
    }
    const onCloseModal = () => {
        if (formRef.current) formRef.current.handleReset()

        setModalInfo({
            ...modalInfo,
            show: false,
            flightNum: "",
            type: "action",
            err: "",
        })
    }

    return (
        <>
            <Formik
                innerRef={formRef}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {() => (
                    <Form className={className}>
                        <div className="field-title">送機計畫</div>
                        <TextInput
                            name="dpartureAirport"
                            placeholder="下車機場"
                            disabled
                            label="下車機場"
                        />
                        <TextInput
                            name="flightNumber"
                            placeholder="航班編號"
                            label="航班編號"
                            disabled={isLoading}
                        />
                        <div className="field-title">旅客資訊</div>
                        <TextInput
                            name="name"
                            placeholder="姓名"
                            label="姓名"
                            disabled={isLoading}
                        />
                        <TextInput
                            name="phoneNumber"
                            placeholder="電話"
                            label="電話"
                            disabled={isLoading}
                        />
                        <TextInput
                            name="idNumber"
                            placeholder="身份證字號/護照編號"
                            label="身份證字號/護照編號"
                            disabled={isLoading}
                        />
                        <TextAreaInput
                            name="note"
                            placeholder="乘車備註"
                            label="乘車備註"
                            disabled={isLoading}
                        />
                        <div className="button-block">
                            <Button
                                mode="dark"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? "查詢中" : "下一步"}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
            <Modal open={modalInfo.show} onClose={onCloseModal}>
                <ModalContainer
                    className={modalInfo.type !== "action" ? "center" : ""}
                >
                    {modalInfo.type === "error" && (
                        <>
                            <Image
                                src="/alert.svg"
                                alt="alert"
                                width={50}
                                height={50}
                            />
                            <Modal.Text
                                text={modalInfo.err || "發生錯誤 請洽客服"}
                                type="h1"
                            />
                            <Modal.Button mode="light" onClick={onCloseModal}>
                                重新填寫
                            </Modal.Button>
                        </>
                    )}
                    {modalInfo.type === "success" && (
                        <>
                            <Image
                                src="/checkcircle.svg"
                                alt="check-circle"
                                width={50}
                                height={50}
                            />
                            <Modal.Text
                                text="完成送機行程"
                                type="h2"
                                className="title"
                            />
                        </>
                    )}
                    {modalInfo.type === "action" && (
                        <>
                            <Modal.Text
                                text={`查不到${modalInfo.flightNum}航班資訊`}
                                type="h2"
                                className="title"
                            />
                            <Modal.Text
                                text="請確認航班資訊、起飛時間等。你也可以直接填寫此航班作為機場接送資訊"
                                className="subtext"
                            />
                            <Modal.Button
                                mode="dark"
                                onClick={() =>
                                    setModalInfo({
                                        ...modalInfo,
                                        type: "success",
                                    })
                                }
                            >
                                確認航班資訊、並送出
                            </Modal.Button>
                            <Modal.Button mode="light" onClick={onCloseModal}>
                                重新填寫
                            </Modal.Button>
                        </>
                    )}
                </ModalContainer>
            </Modal>
        </>
    )
}

export default styled(FlightForm)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 24px;
    box-sizing: border-box;
    .field-title {
        width: 100%;
        text-align: start;
        font-size: ${({ theme }) => theme.textScale.h2};
        font-weight: 700;
    }
    .button-block {
        width: 100%;
        bottom: 0;
        left: 0;
        position: sticky;
        background-color: white;
        padding: 12px 0;
        display: flex;
        justify-self: flex-end;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }
`
