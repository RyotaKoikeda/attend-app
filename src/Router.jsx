import React from "react";
import { Route, Switch } from "react-router";
import { Home, SignUp } from "./templates";

const Router = () => {
  return (
    <Switch>
      <Route exact path="(/)?" component={Home} />
      <Route exact path="(/signup)?" component={SignUp} />
    </Switch>
  );
};

export default Router;
