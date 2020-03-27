import * as React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import NavigationBar from "Components/navigation-bar";

import routes from "./routes";

import "Styleguide/global.scss";
import * as Styles from "./index.scss";

const App = () => {
  return (
    <div>
      <NavigationBar />
      <div className={Styles.content}>
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      </div>
    </div>
  );
};

hydrate(<App />, document.getElementById("root"));
