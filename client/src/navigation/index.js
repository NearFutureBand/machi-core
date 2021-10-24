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

export default function Navigator() {
  const isAnybodyRegistered = useSelector(state => state.app.isRegistered);
  const isConnectedToServer = useSelector(state => state.app.isConnected);
  const isGameStarted = useSelector(state => state.app.isGameStarted);

  return (
    <Router>
      <div className="navigator">
        <WebsocketController />
        { !isConnectedToServer && <Redirect to="/registration" />}
        { !isAnybodyRegistered && <Redirect to="/registration" />}
        {(isAnybodyRegistered && !isGameStarted) && <Redirect to="/lobby" />}
        {(isAnybodyRegistered && isGameStarted) && <Redirect to="/" />}
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