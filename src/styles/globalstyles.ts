import { createGlobalStyle } from "styled-components"
import { reset } from "./reset"
const GlobalStyle = createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css2?family=Chocolate+Classical+Sans&display=swap');
  body{
    font-family: 'Chocolate Classical Sans', sans-serif;
    background-color: #b2b2b2;
  }
  input{
    all: unset;
  }
`

export default GlobalStyle
