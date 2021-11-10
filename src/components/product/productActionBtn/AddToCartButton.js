import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import {
  ADD_TO_CART_BTN_COLOR,
  ADD_TO_CART_BTN_DARK_COLOR,
  PAGE_SECONDARY_COLOR,
} from "../../../constants/colors";
import { auth } from "../../../firebase";
import { addProductToCart } from "../../../controllers/cartControllers";
import { BuyBtnContext } from "../../../contexts";
import LogInDialog from "../../dialog/LogInDialog";
import { getProductById } from "../../../controllers/productCotrollers";
import { Snackbar } from "@mui/material";

const AddToCartBtn = styled(Button)(() => ({
  color: PAGE_SECONDARY_COLOR,
  backgroundColor: ADD_TO_CART_BTN_COLOR,
  borderRadius: 8,
  fontFamily: "sans-serif",
  width: 135,
  height: 32,
  margin: 3,

  "&:hover": {
    backgroundColor: ADD_TO_CART_BTN_DARK_COLOR,
  },
}));

export default function AddToCartButton({ productID }) {
  const [showLogInDialog, setShowLogInDialog] = useState(false);
  const [showCartAddNotification, setShowCartAddNotification] = useState(false);

  const onClick = async () => {
    const currentUser = auth.currentUser;
    const product = await getProductById(productID);

    if (currentUser && currentUser.uid !== product.sellerID) {
      try {
        await addProductToCart({
          productID,
          userID: currentUser.uid,
        });
        setShowCartAddNotification(true);
      } catch (e) {
        console.log(e.message);
      }
      return;
    }

    if (!currentUser) {
      setShowLogInDialog(true);
    }
  };

  const onSignIn = async () => {
    setShowLogInDialog(false);
    const product = await getProductById(productID);

    const currentUser = auth.currentUser;

    if (product.sellerID === currentUser.uid) return;

    try {
      await addProductToCart({
        productID,
        userID: currentUser.uid,
      });
      setShowCartAddNotification(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  const onClose = () => {
    setShowCartAddNotification(false);
  };

  return (
    <div>
      <AddToCartBtn onClick={() => onClick()}>Add to cart</AddToCartBtn>

      {showLogInDialog && (
        <BuyBtnContext.Provider
          value={{
            onCancel: () => {
              setShowLogInDialog(false);
            },
            onSignIn: onSignIn,
          }}
        >
          <LogInDialog />
        </BuyBtnContext.Provider>
      )}

      {showCartAddNotification && (
        <Snackbar
          open={showCartAddNotification}
          autoHideDuration={4000}
          onClose={onClose}
          message="     Product has been added to your cart"
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        />
      )}
    </div>
  );
}
