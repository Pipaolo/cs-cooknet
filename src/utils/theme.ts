import { extendTheme } from "@chakra-ui/react";
const tailwindColors = require("tailwindcss/colors");
const theme = extendTheme({
  colors: {
    stone: tailwindColors.stone,
  },
});

export default theme;
