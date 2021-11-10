import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";

import { getCartById, updateCart } from "../../../controllers/cartControllers";
import { auth } from "../../../firebase";
import { activateCartMenu } from "../../../redux/common/menuStatus/actions";
import { PAGE_SECONDARY_COLOR } from "../../../constants/colors";
import BuyButtonCart from "./BuyButtonCart";
import CustomCircularProgress from "../../customized/CustomCircularProgress";
import ProductListInCart from "./ProductListInCart";
import PurchaseDialog from "../../dialog/PurchaseDialog";

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

const useStyles = makeStyles(() => {
  return {
    wrapper: {
      display: "flex",
      justifyContent: "center",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      width: (2 * windowWidth) / 5,
      height: (2 * windowHeight) / 3,
      backgroundColor: PAGE_SECONDARY_COLOR,
      marginTop: 20,
      borderRadius: 20,
      "@media only screen and (max-width: 737px)": {
        display: "flex",
        flexDirection: "column",
        width: windowWidth / 3,
        height: (2 * windowHeight) / 3,
        backgroundColor: PAGE_SECONDARY_COLOR,
        marginTop: 20,
        borderRadius: 20,
      },
      "@media only screen and (max-width: 550px)": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: windowWidth / 4,
        height: (2 * windowHeight) / 3,
        backgroundColor: PAGE_SECONDARY_COLOR,
        marginTop: 20,
        borderRadius: 20,
      },
    },
    products: {
      marginTop: 10,
      maxHeight: (2 * windowHeight) / 5,
      overflowY: "auto",
    },
    totalPrice: {
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "2px solid grey",
      margin: 10,
    },
    buySection: {
      display: "flex",
      justifyContent: "right",
      marginTop: 10,
      marginRight: 10,
    },
  };
});

const calculateTotalPrice = (cart) => {
  let total = 0;

  return cart.reduce(
    (prevValue, elem) => prevValue + parseFloat(elem.data.price),
    total
  );
};

export default function Cart() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);

  useEffect(() => {
    dispatch(activateCartMenu());

    (async () => {
      try {
        const currentUser = auth.currentUser;
        const cartInfo = await getCartById({ userID: currentUser.uid });
        setCart(cartInfo);
      } catch (e) {
        console.log(e.message);
      }
      setShowLoading(false);
    })();
  }, [dispatch]);

  const deleteProductFromCartById = async (id) => {
    let crt = [...cart];
    let index = crt.findIndex((elem) => id === elem.productID);

    if (crt.length === 1) crt = [];
    else crt.splice(index, 1);

    setCart(crt);

    try {
      await updateCart({
        productsList: crt.map((elem) => elem.productID),
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const confirmBuy = async () => {
    setShowPurchaseDialog(false);
    console.log("funks");

    setCart([]);

    try {
      await updateCart({
        productsList: [],
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const cancelBuy = () => {
    console.log("cancel");
    setShowPurchaseDialog(false);
  };

  return (
    <div className={classes.wrapper}>
      {showLoading ? (
        <CustomCircularProgress />
      ) : (
        <div className={classes.container}>
          <div className={classes.totalPrice}>
            <span>
              <h3>Total Price:</h3>
            </span>
            <span>
              <h3>{calculateTotalPrice(cart)}$</h3>
            </span>
          </div>

          <div className={classes.products}>
            <ProductListInCart
              cart={cart}
              onDelete={deleteProductFromCartById}
            />
          </div>

          <div className={classes.buySection}>
            <BuyButtonCart
              totalPrice={calculateTotalPrice(cart)}
              onClick={() => setShowPurchaseDialog(true)}
            />
          </div>

          {showPurchaseDialog && (
            <PurchaseDialog
              price={calculateTotalPrice(cart)}
              onCancel={cancelBuy}
              onConfirm={confirmBuy}
            />
          )}
        </div>
      )}
    </div>
  );
}
