import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    html,body {
        font-size:62.5%; //1rem -> 10px
        font-family: 'Noto Sans KR', sans-serif;
        color:#474747;
    }
    a{
        text-decoration:none;
    }
    *{
        box-sizing:border-box;
    }
    img {
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
    }

    @media screen and (max-width: 648px) {
        html,body {
        font-size:50%;
    }
  }
`;

export default GlobalStyles;
