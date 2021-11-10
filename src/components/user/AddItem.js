import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  CourseNameTextField,
  DescriptionTextField,
  ImageUrlTextField,
  PriceTextField,
} from "./customizedTextFields";
import { StyledButton } from "../customized/StyledButton";
import { auth } from "../../firebase";
import {
  PAGE_PRIMARY_COLOR,
  PAGE_SECONDARY_COLOR,
} from "../../constants/colors";
import { MAIN_ROUTE } from "../../constants/routes";
import { setRenderProject } from "../../redux/common/renderProject";
import { addNewProduct } from "../../controllers/productCotrollers";
import { activateAddItemMenu } from "../../redux/common/menuStatus/actions";

const useStyles = makeStyles(() => {
  return {
    wrapper: {
      display: "flex",
      justifyContent: "center",
    },
    container: {
      borderRadius: 15,
      backgroundColor: PAGE_SECONDARY_COLOR,
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      marginTop: 30,
      marginBottom: 30,
      height: 650,
      width: 600,
      "@media only screen and (max-width: 737px)": {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        height: 600,
        width: 400,
      },
    },
    h1: {
      textAlign: "center",
      color: PAGE_PRIMARY_COLOR,
      "@media only screen and (max-width: 737px)": {
        fontSize: 22,
        marginBottom: -5,
      },
    },
    form: {
      margin: 15,
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
    buttonSection: {
      marginTop: 10,
      display: "flex",
      justifyContent: "center",
    },
    textFieldBlock: {
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "row",
      alignItems: "center",
    },
    text: {
      fontFamily: "sans-serif",
      fontSize: 17,
      color: PAGE_PRIMARY_COLOR,
      width: 120,
      "@media only screen and (max-width: 737px)": {
        fontSize: 15,
      },
    },
    price: {
      "@media only screen and (max-width: 737px)": {
        marginLeft: -39,
      },
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

function AddItem() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    dispatch(activateAddItemMenu());
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!courseName || !description || !imageUrl) {
      setErrorMessage("All fields must be filled.");
      return;
    }
    setCourseName(courseName.trim());
    setDescription(description.trim());
    setImageUrl(imageUrl.trim());

    const user = auth.currentUser;

    try {
      await addNewProduct({
        courseName,
        description,
        imageUrl,
        price,
        sellerID: user.uid,
      });
    } catch (e) {
      setErrorMessage(e.message);
    }

    history.push(MAIN_ROUTE);
    dispatch(setRenderProject());
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <h1 className={classes.h1}>Add Course</h1>

        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.textFieldBlock}>
            <span className={classes.text}>Course Name: </span>
            <CourseNameTextField
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
          <div className={classes.textFieldBlock}>
            <span className={classes.text}>Description: </span>
            <DescriptionTextField
              multiline={true}
              maxRows={8}
              minRows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={classes.textFieldBlock}>
            <span className={classes.text}>Image url: </span>
            <ImageUrlTextField
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className={classes.textFieldBlock}>
            <span className={classes.text}>Price ($): </span>
            <div className={classes.price}>
              <PriceTextField
                className={classes.price}
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className={classes.errorMessage}>
            {errorMessage ? (
              errorMessage
            ) : (
              <span style={{ color: PAGE_SECONDARY_COLOR }}></span>
            )}
          </div>

          <div className={classes.buttonSection}>
            <StyledButton variant="contained" type="submit">
              Add Course
            </StyledButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
