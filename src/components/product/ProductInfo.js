import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { PAGE_SECONDARY_COLOR } from "../../constants/colors";
import { getProductById } from "../../controllers/productCotrollers";
import BuyButton from "./productActionBtn/BuyButton";
import image404 from "../../assets/img/404Error.jpg";
import { MAIN_ROUTE } from "../../constants/routes";
import { setRenderProject } from "../../redux/common/renderProject";
import CustomCircularProgress from "../customized/CustomCircularProgress";
import AddToCart from "./productActionBtn/AddToCartButton";

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

const useStyles = makeStyles(() => {
  return {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      fontFamily: "sans-serif",
    },
    container: {
      width: (2 * windowWidth) / 3,
      height: (4 * windowHeight) / 5,
      marginTop: 20,
      marginBottom: 20,
      padding: 20,
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: PAGE_SECONDARY_COLOR,
      borderRadius: 15,
    },
    imageSection: {
      flex: 1,
      textAlign: "center",
    },
    img: {
      width: (2 * windowWidth) / 9,
      height: (2 * windowWidth) / 12,
    },
    productInfoSection: {
      flex: 2,
      width: (4 * windowHeight) / 9,
      paddingLeft: 10,
      marginLeft: 1,
    },
    courseName: {
      whiteSpace: "pre-line",
      wordWrap: "break-word",
      maxHeight: windowHeight / 6,
      overflowY: "auto",
    },
    description: {
      maxHeight: (2.2 * windowHeight) / 6,
      overflowY: "auto",
      fontSize: 20,
      whiteSpace: "pre-line",
      wordWrap: "break-word",
    },
    priceSection: {
      display: "flex",
      justifyContent: "space-between",
    },
    price: {
      color: "red",
    },
    page404: {
      flex: "100%",
      alignContent: "center",
    },
    buttonSection: {
      display: "flex",
      justifyContent: "space-between",
    },
  };
});

const renderInfoCard = ({
  classes,
  isProductDataGet,
  imageUrl,
  courseName,
  description,
  price,
  productID,
}) => {
  if (isProductDataGet) {
    return (
      <div>
        <div className={classes.container}>
          <div className={classes.imageSection}>
            <img className={classes.img} src={imageUrl} alt="img" />
          </div>
          <div className={classes.productInfoSection}>
            <h1 className={classes.courseName}>{courseName}</h1>
            <hr />
            <p className={classes.description}>{description}</p>
            <hr />

            <div className={classes.priceSection}>
              <p>
                <b>
                  Price : <span className={classes.price}>{price}</span> $
                </b>
              </p>
              <div className={classes.buttonSection}>
                <AddToCart productID={productID} />
                <BuyButton productID={productID} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <CustomCircularProgress />;
  }
};

export default function ProductInfo({ id = {} }) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [show404Page, setShow404Page] = useState(false);
  const [isProductDataGet, setIsProductDataGet] = useState(false);

  useEffect(() => {
    if (Object.keys(id).length === 0) {
      setShow404Page(true);
    } else {
      (async function () {
        try {
          const product = await getProductById(id.productID);
          setIsProductDataGet(true);
          setCourseName(product.courseName);
          setDescription(product.description);
          setImageUrl(product.imageUrl);
          setPrice(product.price);
        } catch (e) {
          console.log(e.message);
          history.push(MAIN_ROUTE);
          dispatch(setRenderProject());
        }
      })();
    }
  }, [dispatch, history, id]);

  return (
    <div className={classes.wrapper}>
      {show404Page ? (
        <div className={classes.page404}>
          <img
            src={image404}
            alt="404 Page"
            height={(windowHeight * 11) / 12}
            width={windowWidth}
          />
        </div>
      ) : (
        renderInfoCard({
          classes,
          isProductDataGet,
          imageUrl,
          courseName,
          description,
          price,
          productID: id.productID,
        })
      )}
    </div>
  );
}
