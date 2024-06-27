import React from "react"
import Head from "next/head"
import styled from "styled-components"
import FlightForm from "@/components/form"

interface HomeProp {
    className: string
}

const Home: React.FC<HomeProp> = ({ className }) => {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={className}>
                <h1>hello</h1>
                <FlightForm />
            </main>
        </>
    )
}

export default styled(Home)`
    background-color: white;
    max-width: 768px;
    margin: 0 auto;
    height: 100vh;
    width: 100%;
    padding: 24px 24px 36px;
    box-sizing: border-box;
`
