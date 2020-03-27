import * as React from "react";

import * as Styles from "./navigation-bar.scss";

class NavigationBar extends React.Component {
  render() {
    return (
      <div className={Styles.container}>
        <div className={Styles.title}>Sportuok</div>
        <button type="button" className={Styles.mobileNavButton}>
          <span className={Styles.screenReaderText}>Open Navigation</span>
          <svg
            className={Styles.iconBurger}
            width="28px"
            height="28px"
            viewBox="0 0 24 24"
          >
            <rect y="2" width="24" height="2" rx="1"></rect>
            <rect y="20" width="24" height="2" rx="1"></rect>
            <rect y="8" width="24" height="2" rx="1"></rect>
            <rect y="14" width="24" height="2" rx="1"></rect>
          </svg>
        </button>
        <div className={Styles.signIn}>Sign in</div>
      </div>
    );
  }
}

export default NavigationBar;
