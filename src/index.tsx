import * as React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";

import { ApplicationState } from "Store/index";
import { configureStore } from "./configure-store";
import routes from "./routes";

import "Styleguide/global.scss";

const initialState: ApplicationState = {
  content: { routines: [], workouts: [] },
  activeItem: { routine: null, workout: null },
  modal: { type: null, props: null, result: null }
};

const store = configureStore(initialState);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </Provider>
  );
};

hydrate(<App />, document.getElementById("root"));
