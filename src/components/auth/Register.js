import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { InputTextField } from "../customized/InputTextField";
import { StyledButton } from "../customized/StyledButton";
import { createNewAccount } from "../../controllers/authControllers";
import { MAIN_ROUTE } from "../../constants/routes";
import { PAGE_SECONDARY_COLOR } from "../../constants/colors";
import { setRenderProject } from "../../redux/common/renderProject";
import { createCart } from "../../controllers/cartControllers";

const useStyles = makeStyles(() => {
  return {
    wrapper: {
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
      justifyContent: "center",
    },
    hint: {
      color: "gray",
      fontFamily: "sans-serif",
      fontSize: 12,
      marginTop: 20,
    },
    errorMessage: {
      display: "flex",
      justifyContent: "center",
      color: "red",
      fontFamily: "sans-serif",
      fontSize: 15,
    },
  };
});

export default function Register() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createNewAccount({
        userName,
        password,
        email,
        avatarUrl,
      });

      await createCart();

      dispatch(setRenderProject());

      history.push(MAIN_ROUTE);
    } catch (error) {
      setErrorMessage(error.message);
    }
    console.log("new user has successfully created");
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
          label="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <InputTextField
          label="Avatar url"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
        <InputTextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className={classes.errorMessage}>
          {errorMessage ? (
            errorMessage
          ) : (
            <span style={{ color: PAGE_SECONDARY_COLOR }} />
          )}
        </div>

        <div className={classes.buttonSection}>
          <StyledButton variant="contained" type="submit">
            Create Account
          </StyledButton>
        </div>

        <p className={classes.hint}>*password must be at least 6 symbols</p>
      </form>
    </div>
  );
}
