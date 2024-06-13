import Header from "./Header/Header.js";
import Main from "./Main/Main.js";
import Footer from "./Footer/Footer.js";
import { ThemeProvider } from '@mui/material/styles';
export default function App() {
  return (
    <div className="app">
      <Header />
      {/* <Main /> */}
      <Footer />
    </div>
  )
}