import React from "react";
import { Route, Switch } from "react-router";
import { AttendEdit, Home, SignUp, StaffEdit } from "./templates";
import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path="(/)?" component={Home} />
      <Auth>
        <Route path="/staff/edit(/:id)?" component={StaffEdit} />
        <Route exact path="/attend/edit" component={AttendEdit} />
        <Route exact path="/signup" component={SignUp} />
      </Auth>
    </Switch>
  );
};

export default Router;
