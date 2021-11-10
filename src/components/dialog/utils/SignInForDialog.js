import React, { useContext, useState } from "react";
import { makeStyles } from "@mui/styles";

import { InputTextField } from "../../customized/InputTextField";
import { logInToAccount } from "../../../controllers/authControllers";
import { PAGE_SECONDARY_COLOR } from "../../../constants/colors";
import { StyledButtonDialog } from "./StyledButtonDialog";
import { BuyBtnContext } from "../../../contexts";
import { LOG_IN_ROUTE } from "../../../constants/routes";

const useStyles = makeStyles(() => {
  return {
    wrapper: {
      marginTop: 0,
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
    form: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
    buttonSection: {
      marginTop: 10,
      display: "flex",
      justifyContent: "space-around",
    },
    errorMessage: {
      display: "flex",
      justifyContent: "center",
      color: "red",
      fontFamily: "sans-serif",
      fontSize: 15,
    },
    signUpSection: {
      display: "flex",
      justifyContent: "center",
      color: "#646060",
    },
    signUpLink: {
      display: "flex",
      alignItems: "center",
      marginLeft: 5,
    },
  };
});

export default function SignInForDialog() {
  const classes = useStyles();
  const buyBtnContext = useContext(BuyBtnContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await logInToAccount({ email, password });

      buyBtnContext.onSignIn();
      console.log("user has successfully logged in");
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <div className={classes.wrapper}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <InputTextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputTextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className={classes.errorMessage}>
          {errorMessage ? (
            errorMessage
          ) : (
            <span style={{ color: PAGE_SECONDARY_COLOR }}></span>
          )}
        </div>
        <div className={classes.signUpSection}>
          <p> Don't have an account? </p>
          <a className={classes.signUpLink} href={LOG_IN_ROUTE}>
            Sign up
          </a>
        </div>

        <div className={classes.buttonSection}>
          <StyledButtonDialog variant="contained" type="submit">
            Log In
          </StyledButtonDialog>
          <StyledButtonDialog
            variant="contained"
            type="submit"
            onClick={() => buyBtnContext.onCancel()}
          >
            Cancel
          </StyledButtonDialog>
        </div>
      </form>
    </div>
  );
}
