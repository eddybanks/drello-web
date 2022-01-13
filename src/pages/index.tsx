import Head from "next/head";
import { Header, headerHeight } from "src/features/header/header";
import { url } from "src/utils/url/others";
import { colors, zIndex } from "src/utils/styles";
import styled from "styled-components";
import { useAuth } from "src/features/auth/use-auth";
import { SigninButton } from "src/features/header/signin-button";
import { GoToBoardButton } from "src/features/header/go-to-board-button";
import { useMediaQuery } from "react-responsive";

const footerHeight = "3em";

const LandingMain = styled.main`
  padding: 0 5em;
  height: calc(100vh - ${headerHeight} - ${footerHeight});

  display: grid;
  gap: 4em;
  align-items: center;
  align-content: center;

  text-align: center;
  background-image: linear-gradient(
    to bottom right,
    ${colors.primary} 30%,
    ${colors.white()} 0
  );
  color: ${colors.text};

  @media screen and (max-height: 450px) {
    gap: 2em;
  }
`;

const Headline = styled.article`
  font-size: 4rem;
  font-weight: bold;
  color: ${colors.boldText};

  @media screen and (max-width: 720px) {
    font-size: 3rem;
  }

  @media screen and (max-height: 450px) {
    font-size: 3rem;
  }
`;

const InnerLink = styled.span`
  color: ${colors.text}; /* To change the color of the visited link in Safari */
`;

const Footer = styled.footer`
  z-index: ${zIndex.footer};
  height: ${footerHeight};
  width: 100%;

  position: fixed;
  bottom: 0;

  display: grid;
  justify-content: center;
  align-items: center;

  text-align: center;
  background-color: ${colors.background};
`;

const HomePage = () => {
  const { currentUser } = useAuth();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 460px)" });

  return (
    <>
      <Head>
        <title>Drello</title>
        <meta name="description" content="A Trello clone" />
      </Head>
      <Header disableShadow={true} />
      <LandingMain>
        <Headline>
          Simple Kanban
          <br />
          for your todos
        </Headline>
        <div>
          {currentUser ? (
            <GoToBoardButton
              boardId={currentUser.boardId}
              style={{ padding: "0.7em 2em" }}
            />
          ) : (
            <SigninButton
              text={isSmallScreen ? "Get Started" : "Login to Get Started"}
              style={{ padding: "0.7em 2em" }}
            />
          )}
        </div>
      </LandingMain>
      <Footer>
        <a href={url.setunasGithub} target="_blank" rel="noreferrer">
          <InnerLink>&copy; 2022 Setunas Team</InnerLink>
        </a>
      </Footer>
    </>
  );
};

export default HomePage;
