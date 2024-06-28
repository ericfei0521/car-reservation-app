import React, { useEffect } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import styled from "styled-components"
import FlightForm from "@/components/flightForm"
import { fetchToken } from "@/services/index"

export const getServerSideProps: GetServerSideProps = async () => {
    const token = await fetchToken()
    return {
        props: { token: token },
    }
}
interface HomeProp {
    className: string
    token: string
}

const Home: React.FC<HomeProp> = ({ className, token }) => {
    useEffect(() => {
        if (token) localStorage.setItem("token", token)
    }, [token])

    return (
        <>
            <Head>
                <title>Car reservation app</title>
                <meta name="description" content="Car reservation app" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/coffee.svg" />
            </Head>
            <main className={className}>
                <div className="form">
                    <div className="form-title">送機行程</div>
                    <FlightForm />
                </div>
            </main>
        </>
    )
}

export default styled(Home)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    .form {
        position: relative;
        display: flex;
        flex-direction: column;
        max-width: 768px;
        margin: 0 auto;
        height: 100%;
        overflow: hidden;
        width: 100%;
        padding-top: 24px;
        box-sizing: border-box;
        @media screen and (min-width: 768px) {
            height: 80vh;
            border-radius: 4px;
            box-shadow: 0 0 5px ${({ theme }) => theme.color.disable};
        }
        background-color: white;
    }
    .form-title {
        font-size: ${({ theme }) => theme.textScale.h1};
        text-align: center;
        margin-bottom: 24px;
        font-weight: 700;
    }
`
