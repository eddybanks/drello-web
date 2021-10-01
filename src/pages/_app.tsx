import { createGlobalStyle, ThemeProvider } from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  fas,
  faHome,
  faPlus,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(fab, fas, faHome, faPlus, faSignInAlt);

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  html, body, #__next {
    height: 100%;
    width: 100%;
  }
  body, #__next {
    font-family: "Trebuchet MS";
  }
  #__next {
    display: grid;
    grid-template-rows: 1fr 9fr 2em;
    grid-gap: 1em;
  }
  a {
    text-decoration: none;
  }
`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
