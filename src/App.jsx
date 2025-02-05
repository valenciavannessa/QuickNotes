import React from "react";
import { Route, Routes } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import NavigationBar from "./components/NavigationBar";
import { LocaleProvider } from "./contexts/LocaleContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import AddNotePage from "./pages/AddNotePage";
import ArchivedPage from "./pages/ArchivedPage";
import DetailNotePageWrapper from "./pages/DetailNotePage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { getUserLogged, putAccessToken } from "./utils/network-data";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem("theme") || "dark",
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === "dark" ? "light" : "dark";
          localStorage.setItem("theme", newTheme);
          return {
            theme: newTheme,
          };
        });
      },
      localeContext: {
        locale: localStorage.getItem("locale") || "EN",
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale =
              prevState.localeContext.locale === "EN" ? "ID" : "EN";
            localStorage.setItem("locale", newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale,
              },
            };
          });
        },
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });
    putAccessToken("");
  }

  async componentDidMount() {
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
    document.documentElement.setAttribute("data-theme", this.state.theme);
  }

  componentDidUpdate(prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute("data-theme", this.state.theme);
    }
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <>
          <LocaleProvider value={this.state.localeContext}>
            <header>
              <NavigationBar />
            </header>
            <main>
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={this.onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </LocaleProvider>
        </>
      );
    }
    return (
      <>
        <ThemeProvider value={this.state}>
          <LocaleProvider value={this.state.localeContext}>
            <header>
              <NavigationBar name={this.state.authedUser.name} />
            </header>
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/archived-notes" element={<ArchivedPage />} />
                <Route path="/add-note" element={<AddNotePage />} />
                <Route path="/notes/:id" element={<DetailNotePageWrapper />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
              <MenuBar logout={this.onLogout} />
            </main>
          </LocaleProvider>
        </ThemeProvider>
      </>
    );
  }
}

export default App;
