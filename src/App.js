import React from "react";
import Router from "./Router";
import "./assets/reset.css";
import "./assets/style.css";
import "./assets/css/base.scss";
import "./assets/css/mixin.scss";
import "./assets/css/reset.scss";

const App = () => {
  return (
    <main className="c-main">
      <Router />
    </main>
  );
};

export default App;
