import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Home = lazy(() => import("pages/Home"));
const NewRoom = lazy(() => import("pages/NewRoom"));
const Room = lazy(() => import("pages/Room"));
const AdminRoom = lazy(() => import("pages/AdminRoom"));

export const RouterApp = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/rooms/new" exact component={NewRoom} />
        <Route path="/rooms/:id" component={Room} />
        <Route path="/admin/rooms/:id" component={AdminRoom} />
      </Switch>
    </Suspense>
  </Router>
);
