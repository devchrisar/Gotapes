import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  styles: {
    global: {
      body: {
        bgColor: `brand.background_grey_dark`,
        m: "0px",
        color: `brand.font_light`,
        fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif`,
      },
      a: {
        color: "brand.primary",
        textDecoration: "underline",
      },
    },
  },
  colors: {
    brand: {
      background_grey_dark: "#15212b",
      font_light: "#fff",
      primary: "#1da0f2",
    },
  },
});
