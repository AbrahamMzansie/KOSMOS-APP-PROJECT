import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import home from "./pages/home";
import signin from "./pages/signin";
import signup from "./pages/signup";
import NavBar from "./components/Navbar";
import User from "./pages/User";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
});
const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <div className="container">
          <Switch>
            <Route path="/" component={home} exact></Route>
            <Route path="/signin" component={signin} exact></Route>
            <Route path="/signup" component={signup} exact></Route>
            <Route path="/user/:userHandler" component={User} exact></Route>
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
