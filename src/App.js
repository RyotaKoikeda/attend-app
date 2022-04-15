import React from "react";
import Router from "./Router";
import { Header } from "./components/Header";
import "./assets/css/base.scss";
import "./assets/css/mixin.scss";
import "./assets/css/reset.scss";

const App = () => {
  return (
    <>
      <Header />
      <Router />
    </>
  );
};

export default App;
