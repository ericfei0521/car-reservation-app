import React from "react"
import { Formik, Form } from "formik"
import { TextInput } from "./FormikFields"
import styled from "styled-components"
import * as yup from "yup"

interface FormValues {
    dpartureAirport: string
    flightPlan: string
    flightNumber: string
    name: string
    phoneNumber: string
    idNumber: string
}

const validationSchema = yup.object().shape({
    flightPlan: yup.string().required("航班計畫為必填項"),
    flightNumber: yup
        .string()
        .matches(/^[a-zA-Z0-9\s]*$/, "航班編號只能接受英文字符與數字")
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
})

const initialValues: FormValues = {
    dpartureAirport: "桃園國際機場",
    flightPlan: "",
    flightNumber: "",
    name: "",
    phoneNumber: "",
    idNumber: "",
}
interface FlightFormProps {
    className?: string
}
const FlightForm: React.FC<FlightFormProps> = ({ className }) => {
    const handleSubmit = (values: FormValues) => {
        console.log("Form data", values)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
        >
            {() => (
                <Form className={className}>
                    <TextInput
                        name="dpartureAirport"
                        placeholder="下車機場"
                        isDisabled
                    />
                    <TextInput name="flightNumber" placeholder="航班編號" />
                    <TextInput name="name" placeholder="姓名" />
                    <TextInput name="phoneNumber" placeholder="電話" />
                    <TextInput
                        name="idNumber"
                        placeholder="身份證字號/護照編號"
                    />
                    <button type="submit">下一步</button>
                </Form>
            )}
        </Formik>
    )
}

export default styled(FlightForm)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
`
