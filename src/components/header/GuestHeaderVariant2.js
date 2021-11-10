import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { Link, useHistory } from "react-router-dom";
import { ABOUT_ROUTE, MAIN_ROUTE, SIGN_IN_ROUTE } from "../constants/Routes";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const useStyles = makeStyles(() => {
  return {
    root: {
      height: 60,
      display: "flex",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#00305C",
    },
    link: {
      marginLeft: 10,
      marginRight: 10,
      fontSize: 15,
      textDecorationLine: "none",
      color: "white",
    },
    button: {
      color: "white",
    },
    search: {
      display: "flex",
      justifyContent: "flex-end",
      marginRight: 10,
      paddingTop: 70,
      paddingBottom: 100,
    },
  };
});

export default function Header() {
  const classes = useStyles();
  const history = useHistory();

  const onSigninClick = () => {
    history.push(SIGN_IN_ROUTE);
  };

  return (
    <>
      <div className={classes.root}>
        <div>
          <ShoppingCartIcon
            style={{
              fontSize: 30,
              cursor: "pointer",
              marginLeft: 20,
              color: "white",
            }}
            onClick={() => history.push(MAIN_ROUTE)}
          />
        </div>

        <div>
          <Link className={classes.link} to={MAIN_ROUTE}>
            Store
          </Link>
          <Link className={classes.link} to={ABOUT_ROUTE}>
            About Us
          </Link>
          <Button
            onClick={onSigninClick}
            style={{ borderColor: "white", color: "white", marginRight: 10 }}
            variant="outlined"
          >
            Sign In
          </Button>
        </div>
      </div>
    </>
  );
}
