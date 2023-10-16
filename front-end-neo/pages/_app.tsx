import type { AppProps } from "next/app";

import Head from "next/head";
import { theme } from "../styles/theme";
import MainHeaderBar from "../src/MainHeaderBar";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { MainHeaderBarPlaceholder } from "../src/PlaceHolder";
import { RecoilRoot } from "recoil";
import NavigationBar from "../src/NavigationBar";
import { useRouter } from "next/router";
import { NeoWalletProvider } from "../src/context/NeoLine";
import { Toaster } from "react-hot-toast";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;

  const dontShowPageHeaderBarPath = [
    "/myChallenges/onApplication/diet",
    "/myChallenges/ongoing/diet",
    "/myChallenges/completed/diet",
  ];
  const shouldShowNavigationBarPath = [
    "/myChallenges/ongoing",
    "/myChallenges/onApplication",
    "/myChallenges/completed",
  ];
  const shouldShowNavigationBarPathStartsWith = ["/home/"];

  return (
    <>
      <GlobalStyle />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SuperSquad</title>
      </Head>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <NeoWalletProvider>
            {!dontShowPageHeaderBarPath.includes(pathname) && (
              <>
                <MainHeaderBar />
                <MainHeaderBarPlaceholder />
              </>
            )}

            <Component {...pageProps} />
            {/* <NavigationBar /> */}
            {shouldShowNavigationBarPath.includes(pathname) && (
              <NavigationBar />
            )}
            {shouldShowNavigationBarPathStartsWith.some((path) => {
              return pathname.startsWith(path);
            }) && <NavigationBar />}
          </NeoWalletProvider>
          <Toaster />
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
