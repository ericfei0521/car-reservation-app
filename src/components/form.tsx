import React, { useCallback } from "react"
import { Formik, Form } from "formik"
import { TextInput, TextAreaInput } from "./FormikFields"
import styled from "styled-components"
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
interface FlightFormProps {
    className?: string
}
const FlightForm: React.FC<FlightFormProps> = ({ className }) => {
    const handleSubmit = useCallback((values: FormValues) => {
        const airlineIDMatch = values.flightNumber.match(/^[A-Z]{2}/)
        const flightNumberMatch = values.flightNumber.match(/\d+$/)

        const airlineID: string | null = airlineIDMatch
            ? airlineIDMatch[0]
            : null
        const flightNumber: string | null = flightNumberMatch
            ? flightNumberMatch[0]
            : null

        console.log("Form data", airlineID, flightNumber)
    }, [])

    return (
        <Formik
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
                        isDisabled
                        label="下車機場"
                    />
                    <TextInput
                        name="flightNumber"
                        placeholder="航班編號"
                        label="航班編號"
                    />
                    <div className="field-title">旅客資訊</div>
                    <TextInput name="name" placeholder="姓名" label="姓名" />
                    <TextInput
                        name="phoneNumber"
                        placeholder="電話"
                        label="電話"
                    />
                    <TextInput
                        name="idNumber"
                        placeholder="身份證字號/護照編號"
                        label="身份證字號/護照編號"
                    />
                    <TextAreaInput
                        name="note"
                        placeholder="乘車備註"
                        label="乘車備註"
                    />
                    <div className="button-block">
                        <button type="submit">下一步</button>
                    </div>
                </Form>
            )}
        </Formik>
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
        font-size: 20px;
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
        button {
            width: 100%;
            height: 40px;
            font-size: 20px;
        }
    }
`
