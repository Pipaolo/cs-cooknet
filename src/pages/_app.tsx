import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { ChakraProvider } from "@chakra-ui/react";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import theme from "~/utils/theme";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
