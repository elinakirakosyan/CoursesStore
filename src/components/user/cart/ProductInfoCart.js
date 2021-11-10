import React from "react";
import { makeStyles } from "@mui/styles";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHistory } from "react-router-dom";

import {
  DELETE_BTN_COLOR,
  PAGE_PRIMARY_COLOR,
} from "../../../constants/colors";
import { PRODUCT_INFO_ROUTE } from "../../../constants/routes";

const blockHeight = 60;

const useStyles = makeStyles(() => {
  return {
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: blockHeight,
      borderBottom: "1px solid",
      borderColor: "grey",
      marginLeft: 10,
      marginRight: 10,
    },
    imageNameBlock: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
    },
    imageBlock: {
      marginLeft: 10,
      marginRight: 10,
      height: (blockHeight * 2) / 3,
      width: (blockHeight * 2) / 3,
    },
    img: {
      width: (blockHeight * 2) / 3,
      height: (blockHeight * 2) / 3,
    },
    courseName: {
      maxWidth: "200px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    price: {
      marginRight: 10,
    },
    priceIconsBlock: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
    },
  };
});

export default function ProductInfoCart({ product, onDelete }) {
  const classes = useStyles();
  const history = useHistory();

  const onInfoBtnClick = () => {
    const id = product.productID;
    history.push({
      pathname: `${PRODUCT_INFO_ROUTE}/${id}`,
      state: { productID: id },
    });
  };

  return (
    <div className={classes.container}>
      <span className={classes.imageNameBlock}>
        <div className={classes.imageBlock}>
          <img className={classes.img} src={product.data.imageUrl} alt="img" />
        </div>
        <h3 className={classes.courseName}> {product.data.courseName} </h3>
      </span>
      <span className={classes.priceIconsBlock}>
        <h3 className={classes.price}>{product.data.price} $</h3>
        <InfoIcon
          sx={{ color: PAGE_PRIMARY_COLOR, cursor: "pointer" }}
          onClick={onInfoBtnClick}
        />
        <DeleteIcon
          sx={{ color: DELETE_BTN_COLOR, cursor: "pointer" }}
          onClick={() => onDelete(product.productID)}
        />
      </span>
    </div>
  );
}
