import React from "react";
import { Route, Switch } from "react-router";
import { AttendEdit, Home, SignUp, StaffEdit } from "./templates";
import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path="(/)?" component={Home} />
      <Auth>
        <Route exact path="/attend/edit" component={AttendEdit} />
        <Route path="/staff/edit(/:id)?" component={StaffEdit} />
      </Auth>
    </Switch>
  );
};

export default Router;
