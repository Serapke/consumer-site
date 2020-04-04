import * as React from "react";
import { renderRoutes } from "react-router-config";
import NavigationBar from "Components/navigation-bar";

import * as Styles from "./root-page.scss";
import Modal from "Components/modal";

const RootPage = ({ route }: any) => {
  return (
    <div>
      <NavigationBar />
      <div className={Styles.content}>{renderRoutes(route.routes)}</div>
      <Modal />
    </div>
  );
};

export default RootPage;
