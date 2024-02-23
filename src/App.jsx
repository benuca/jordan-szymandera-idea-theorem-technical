import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./App.css";
import Header from "./components/header/header";
import RegisterForm from "./components/registerform/registerform";

const theme = createTheme({
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
  },
  formlabel: {
    fontFamily: ["Lato", "sans-serif"].join(","),
    fontWeight: 700,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <RegisterForm />
    </ThemeProvider>
  );
}

export default App;
