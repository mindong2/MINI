import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    html,body {
        font-size:62.5%;
        font-family: 'Noto Sans KR', sans-serif;
        color:#474747;
    }
    a{
        text-decoration:none;
    }
    *{
        box-sizing:border-box;
    }
`;

export default GlobalStyles;
