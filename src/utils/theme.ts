import { extendTheme } from "@chakra-ui/react";
import tailwindColors from "tailwindcss/colors";

const theme = extendTheme({
  colors: {
    stone: tailwindColors.stone,
  },
});

export default theme;
