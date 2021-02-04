// Dependencies
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import { Login, Play } from "./pages";

// Components
import { Nav } from "./components";

// Assets

function App() {
  return (
    <Router>
      <Nav />
      <div className="App">
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/play" exact>
            <Play />
          </Route>
          <Route path="/" exact>
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;