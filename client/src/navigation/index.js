import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useSelector } from "react-redux";

import { Reports, Registration, Lobby, WebsocketController } from "../components";
import App from '../App';
import "./styles.scss";
import { getGame } from "../redux-toolkit/slices";

export default function Navigator() {
  const isAnybodyRegistered = useSelector(state => state.app.isRegistered);
  const isConnectedToServer = useSelector(state => state.app.isConnected);
  const game = useSelector(getGame);

  return (
    <Router>
      <div className="navigator">
        <WebsocketController />
        {!isAnybodyRegistered && <Redirect to="/registration" />}
        {(isAnybodyRegistered && game.status === "AWAITING_PLAYERS") && <Redirect to="/lobby" />}
        {(isAnybodyRegistered && ( game.status === "AWAITING_DICE" || game.status === "AWAITING_BUILDING")) && <Redirect to="/" />}
        <Switch>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/lobby">
            <Lobby />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
        <div className="reports-wrapper">
          <Reports />
        </div>
      </div>
    </Router>
  );
}