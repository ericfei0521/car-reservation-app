import type { AppProps } from "next/app"
import GlobalStyle from "@/styles/globalstyles"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    )
}
