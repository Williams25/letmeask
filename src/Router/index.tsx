import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Home = lazy(() => import("pages/Home"));
const NewRoom = lazy(() => import("pages/NewRoom"));

export const RouterApp = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </Switch>
    </Suspense>
  </Router>
);
