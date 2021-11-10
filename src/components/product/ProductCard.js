import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { auth } from "../../firebase";
import BuyButton from "./productActionBtn/BuyButton";
import InfoButton from "./productActionBtn/InfoButton";
import EditButton from "./productActionBtn/EditButton";
import DeleteButton from "./productActionBtn/DeleteButton";
import DeleteDialog from "../dialog/DeleteDialog";
import AddToCart from "./productActionBtn/AddToCartButton";
import { setRenderProject } from "../../redux/common/renderProject";
import { deleteProductById } from "../../controllers/productCotrollers";
import { USER_PRODUCTS_ROUTE } from "../../constants/routes";
import { PAGE_SECONDARY_COLOR } from "../../constants/colors";

const useStyles = makeStyles(() => {
  return {
    container: {
      margin: 15,
      width: 300,
      height: 280,
      padding: 5,
      borderRadius: 10,
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      backgroundColor: PAGE_SECONDARY_COLOR,
    },
    h2: {
      width: "200px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      alignItems: "center",
      marginLeft: 50,
      fontSize: 20,
    },
    priceSection: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    price: {
      display: "flex",
      flex: "40%",
      paddingLeft: 25,
    },
    buttonsSection: {
      flex: "60%",
      display: "flex",
      justifyContent: "space-around",
      paddingRight: 15,
    },
    img: {
      display: "flex",
      justifyContent: "center",
    },
    courseName: {
      textAlign: "center",
    },
  };
});

const renderActions = (product, setShowDeleteDialog) => {
  const currentUser = auth.currentUser;

  if (currentUser && currentUser.uid === product.data.sellerID) {
    return (
      <span>
        <EditButton productID={product.productID} />
        <DeleteButton onClick={() => setShowDeleteDialog(true)} />
      </span>
    );
  } else {
    return (
      <span>
        <InfoButton productID={product.productID} />

        <BuyButton productID={product.productID} />

        {<AddToCart productID={product.productID} />}
      </span>
    );
  }
};

export default function ProductCard({ product }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const onCancel = () => {
    setShowDeleteDialog(false);
  };

  const onDelete = async (id) => {
    setShowDeleteDialog(false);
    try {
      await deleteProductById(product.productID);
    } catch (e) {
      console.log(e.message);
    }

    history.push(USER_PRODUCTS_ROUTE);
    dispatch(setRenderProject());
  };

  return (
    <div className={classes.container}>
      <div className={classes.img}>
        <img
          src={product.data.imageUrl}
          alt="img"
          height="120px"
          width="250px"
        />
      </div>
      <div className={classes.courseName}>
        <h2 className={classes.h2}>{product.data.courseName}</h2>
        <hr />
      </div>

      <div className={classes.priceSection}>
        <div className={classes.price}>
          <h3>{product.data.price} $</h3>
        </div>
        <div className={classes.buttonsSection}>
          {renderActions(product, setShowDeleteDialog)}
        </div>
      </div>

      {showDeleteDialog && (
        <DeleteDialog onCancel={onCancel} onDelete={onDelete} />
      )}
    </div>
  );
}
