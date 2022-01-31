import React from "react";
import { Route, Switch } from "react-router";
import { AttendEdit, AttendMenu, Home, SignUp, StaffEdit } from "./templates";
import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path="(/)?" component={Home} />
      <Auth>
        <Route exact path="/attend/edit" component={AttendEdit} />
        <Route exact path="/attend" component={AttendMenu} />
        <Route path="/staff/edit(/:id)?" component={StaffEdit} />
        <Route exact path="/signup" component={SignUp} />
      </Auth>
    </Switch>
  );
};

export default Router;
