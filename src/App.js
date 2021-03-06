// Dependencies
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import { Home, Login, Register, ChangePassword } from "./pages";

// Components
import { Header, ChooseOponent, CreateMatch, Match } from "./components";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  userData: null,
  setPage: "Home",
  id_oponent: null,
  match: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("here dispatched to login", state.setPage);
      // action.payload contains the exact object delivered by the API, and the name of that object is userFound
      localStorage.setItem("userData", JSON.stringify(action.payload.userFound));
      localStorage.setItem("token", JSON.stringify(action.payload.userFound.token));

      return {
        ...state,
        isAuthenticated: true,
        userData: action.payload.userFound,
        token: action.payload.userFound.token,
        setPage: "Home",
      };
    case "LOGOUT":
      localStorage.clear();

      return {
        ...state,
        isAuthenticated: false,
        userData: null,
        token: null,
      };
    case "REGISTER":
      return {
        ...state,
        setPage: "Register",
      };
    case "CHOOSING_OPONENT":
      return {
        ...state,
        setPage: "ChooseOponent",
      };

    case "GO_HOME":
      console.log("hey from go_home");
      return {
        ...state,
        setPage: "Home",
      };
    case "CREATE_MATCH":
      return {
        ...state,
        setPage: "CreateMatch",
        id_oponent: action.payload,
      };
    case "RESUME_MATCH":
      return {
        ...state,
        setPage: "Match",
        match: action.payload,
      };
    case "CHANGE_PASSWORD":
      return {
        ...state,
        setPage: "ChangePassword",
      };
    default:
      return state;
  }
};

// Assets

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  useEffect(() => {
    const userFound = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("token");
    if (userFound && token) {
      dispatch({
        type: "LOGIN",
        payload: {
          userFound,
          token,
        },
      });
    }
  }, []);

  return (
    <Router>
      <AuthContext.Provider value={{ state, dispatch }}>
        <Header />
        <div className="App">
          <Switch>
            <Route exact path="/">
              {!state.isAuthenticated && state.setPage === "Register" ? (
                <Register />
              ) : !state.isAuthenticated ? (
                <Login />
              ) : state.setPage === "ChooseOponent" ? (
                <ChooseOponent />
              ) : state.setPage === "CreateMatch" ? (
                <CreateMatch />
              ) : state.setPage === "Match" ? (
                <Match />
              ) : state.setPage === "Register" ? (
                <Register />
              ) : state.setPage === "ChangePassword" ? (
                <ChangePassword />
              ) : (
                <Home />
              )}
            </Route>
          </Switch>
        </div>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
