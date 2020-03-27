import * as React from "react";

import LinkButton from "Components/link-button";

import * as Styles from "./frontdoor.scss";

const Frontdoor = () => {
  return (
    <div className={Styles.container}>
      <div>Workout link</div>
      <div>Plans carousel</div>
      <LinkButton style="primary" link="/favorites">
        Favorites
      </LinkButton>
    </div>
  );
};

export default Frontdoor;
