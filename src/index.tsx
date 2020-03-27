import * as React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";

import NavigationBar from "Components/navigation-bar";
import { configureStore } from "./configure-store";
import routes from "./routes";

import "Styleguide/global.scss";
import * as Styles from "./index.scss";

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationBar />
      <div className={Styles.content}>
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      </div>
    </Provider>
  );
};

hydrate(<App />, document.getElementById("root"));
