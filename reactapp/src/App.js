import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import token from "./reducers/token";
import commentairesList from "./reducers/comments";
import PageProfil from "./pageprofil";
import Accueil from "./Accueil";
import Profilcomp from "./profilcomp";
import nouvelPublication from "./nouvelPublication";
import Publication from "./publication";
import PageTheme from "./PageTheme";

//import Cookies from 'js-cookie';

const store = createStore(combineReducers({ token, commentairesList}));

function App(props) {
  return (
    <Provider store={store}>
      <Router>
        <Switch>

          <Route component={Accueil} path="/" exact />
          <Route component={PageProfil} path="/pageprofil" exact />
          <Route component={Profilcomp} path="/profilcomp" exact />
          <Route component={Publication} path="/publication/:id" exact />
          <Route component={nouvelPublication} path="/nouvelPublication" exact />
          <Route component={PageTheme} path="/pageTheme/:theme" exact />

        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
