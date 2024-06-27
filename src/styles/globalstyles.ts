import { createGlobalStyle } from "styled-components"
import { reset } from "./reset"
const GlobalStyle = createGlobalStyle`
  ${reset}
  body{
    background-color: #b2b2b2;
  }
  input{
    all: unset;
  }
`

export default GlobalStyle
