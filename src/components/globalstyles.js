import { createGlobalStyle } from "styled-components";
import RobotoThin from "../assets/fonts/Roboto-Thin.ttf"
import RobotoRegular from "../assets/fonts/Roboto-Regular.ttf";
import RobotoMedium from "../assets/fonts/Roboto-Medium.ttf";
import RobotoSemiBold from "../assets/fonts/Roboto-Bold.ttf";

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: Roboto100;
        src: url(${RobotoThin});
    }
    @font-face {
        font-family: Roboto300;
        src: url(${RobotoThin});
    }
    @font-face {
        font-family: Roboto400;
        src: url(${RobotoRegular});
    }
    @font-face {
        font-family: Roboto500;
        src: url(${RobotoMedium});
    }
    @font-face {
        font-family: Roboto600;
        src: url(${RobotoSemiBold});
    }

    body{
        padding: 0;
        margin: 0;
    }
`;