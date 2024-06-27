import { createGlobalStyle } from "styled-components"
import { reset } from "./reset"
const GlobalStyle = createGlobalStyle`
  ${reset}
  body{
    font-family: 'Chocolate Classical Sans', sans-serif;
    background: linear-gradient(45deg, #94f9e2, #ffbcfb);
  }
`

export default GlobalStyle
