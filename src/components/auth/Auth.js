import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  AUTH_ACTIVE_TAB_COLOR,
  AUTH_ACTIVE_TAB_TEXT_COLOR,
  AUTH_PASSIVE_TAB_COLOR,
  AUTH_PASSIVE_TAB_TEXT_COLOR,
  PAGE_SECONDARY_COLOR,
} from "../../constants/colors";
import Signin from "./Signin";
import Register from "./Register";
import { selectUserInfo } from "../../redux/common/userInfo/selectors";
import { MAIN_ROUTE } from "../../constants/routes";

const borderRadius = 12;

const useStyles = makeStyles(() => {
  return {
    wrapper: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    container: {
      height: 525,
      width: 400,
      backgroundColor: PAGE_SECONDARY_COLOR,
      borderRadius: borderRadius,
      marginTop: 25,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    header: {
      width: 400,
      height: 50,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      cursor: "pointer",
    },
  };
});

//position values: left & right
function getTabStyles(isActive, position) {
  const tabColor = isActive ? AUTH_ACTIVE_TAB_COLOR : AUTH_PASSIVE_TAB_COLOR;
  const textColor = isActive
    ? AUTH_ACTIVE_TAB_TEXT_COLOR
    : AUTH_PASSIVE_TAB_TEXT_COLOR;
  let borderTopLeftRad = position === "left" ? borderRadius : 0;
  let borderTopRightRad = position === "right" ? borderRadius : 0;

  return {
    flex: "50%",
    height: 50,
    backgroundColor: tabColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: borderTopRightRad,
    borderTopLeftRadius: borderTopLeftRad,
    color: textColor,
  };
}

export default function Auth() {
  const classes = useStyles();
  const [showSignIn, setShowSignIn] = useState(true);
  const userInfo = useSelector(selectUserInfo);
  const history = useHistory();

  if (userInfo.isAuthenticated) {
    history.push(MAIN_ROUTE);
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.header}>
          <div
            style={getTabStyles(showSignIn, "left")}
            onClick={() => setShowSignIn(true)}
          >
            Log In
          </div>
          <div
            style={getTabStyles(!showSignIn, "right")}
            onClick={() => setShowSignIn(false)}
          >
            Register
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          {showSignIn ? <Signin /> : <Register />}
        </div>
      </div>
    </div>
  );
}
