import * as React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";

import { ApplicationState } from "Store/index";
import { configureStore } from "./configure-store";
import routes from "./routes";

import "Styleguide/global.scss";
import { ThemeProvider } from "@material-ui/core";
import theme from "./styleguide/theme";
import { emptyWorkoutFormState } from "Store/form/utils";

const initialState: ApplicationState = {
  content: { routines: [], workouts: [], exercises: [], bodyParts: [] },
  activeItem: { routine: null, workout: null },
  form: { workout: emptyWorkoutFormState },
  modal: { type: null, props: null, result: null },
};

const store = configureStore(initialState);

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

hydrate(<App />, document.getElementById("root"));
