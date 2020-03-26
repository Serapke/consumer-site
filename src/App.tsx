import * as React from "react";
import { hot } from "react-hot-loader";

import Frontdoor from "./pages/frontdoor";

import "Styleguide/global.scss";

const App = () => {
  return (
    <div>
      <Frontdoor />
    </div>
  );
};

export default hot(module)(App);
