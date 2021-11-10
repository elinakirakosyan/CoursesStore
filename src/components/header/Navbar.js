import { signOut } from "@firebase/auth";
import { makeStyles } from "@mui/styles";
import {
  ABOUT_ROUTE,
  ADD_ITEM_ROUTE,
  MAIN_ROUTE,
  USER_CART_ROUTE,
  USER_PRODUCTS_ROUTE,
  USER_PROFILE_ROUTE,
} from "../../constants/routes";
import { auth } from "../../firebase";
import { setRenderProject } from "../../redux/common/renderProject";
import { userLoggedOut } from "../../redux/common/userInfo/actions";

import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(() => {
  return {
    navbar: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexWrap: "nowrap",
      width: "100%",
      backgroundColor: "#00305C",
      height: "100vh",
      lineHeight: 3,

      "@media (min-width: 737px)": {
        display: "none",
      },
    },
    link: {
      fontSize: 20,
      color: "white",
      margin: 15,
      textDecoration: "none",
    },
    row: {
      width: "100%",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#143bad",
      },
    },
  };
});

export default function Navbar(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogOutHandler = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log("an error occurred while logged out");
    }

    dispatch(userLoggedOut());
    dispatch(setRenderProject());
    history.push(MAIN_ROUTE);
  };

  return (
    <div className={classes.navbar}>
      <div className={classes.row}>
        <Link
          to={MAIN_ROUTE}
          className={classes.link}
          onClick={() => props.isMobile && props.closeHamburgerMenu()}
        >
          Store
        </Link>
      </div>
      <div className={classes.row}>
        <Link
          to={USER_PRODUCTS_ROUTE}
          className={classes.link}
          onClick={() => props.isMobile && props.closeHamburgerMenu()}
        >
          My Products
        </Link>
      </div>
      <div className={classes.row}>
        <Link
          to={ADD_ITEM_ROUTE}
          className={classes.link}
          onClick={() => props.isMobile && props.closeHamburgerMenu()}
        >
          Add Item
        </Link>
      </div>
      <div className={classes.row}>
        <Link
          to={USER_CART_ROUTE}
          className={classes.link}
          onClick={() => props.isMobile && props.closeHamburgerMenu()}
        >
          Cart
        </Link>
      </div>
      <div className={classes.row}>
        <Link
          to={ABOUT_ROUTE}
          className={classes.link}
          onClick={() => props.isMobile && props.closeHamburgerMenu()}
        >
          About
        </Link>
      </div>
      <div className={classes.row}>
        <Link
          to={USER_PROFILE_ROUTE}
          className={classes.link}
          onClick={() => props.isMobile && props.closeHamburgerMenu()}
        >
          Profile
        </Link>
      </div>
      <div className={classes.row}>
        <span className={classes.link} onClick={onLogOutHandler}>
          Log Out
        </span>
      </div>
    </div>
  );
}
