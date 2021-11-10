import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { useStyles, LogInButton } from "./headerStyles";
import { ABOUT_ROUTE, MAIN_ROUTE, LOG_IN_ROUTE } from "../../constants/routes";
import logo from "../../assets/img/logo.png";
import { selectMenuStatus } from "../../redux/common/menuStatus/selectors";

const getMenuItemStyle = (itemStatus, styles) => {
  if (itemStatus) return styles.linkActive;
  else return styles.linkPassive;
};

function GuestHeader() {
  const classes = useStyles();
  const history = useHistory();
  const menuStatus = useSelector(selectMenuStatus);

  const onLogInHandler = () => {
    history.push(LOG_IN_ROUTE);
  };

  return (
    <div className={classes.container}>
      <span>
        <a href={MAIN_ROUTE}>
          <img
            className={classes.logo}
            src={logo}
            alt="Logo"
            height="50px"
            width="50px"
          />
        </a>
      </span>
      <div className={classes.linkBoxGuest}>
        <Link
          className={getMenuItemStyle(menuStatus.storeMenuStatus, classes)}
          to={MAIN_ROUTE}
        >
          Store
        </Link>
        <Link
          className={getMenuItemStyle(menuStatus.aboutMenuStatus, classes)}
          to={ABOUT_ROUTE}
        >
          About
        </Link>
        <LogInButton variant="outlined" onClick={onLogInHandler}>
          Log In
        </LogInButton>
      </div>
    </div>
  );
}

export default GuestHeader;
