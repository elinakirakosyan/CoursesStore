import { setDoc, getDoc, doc } from "firebase/firestore/lite";
import { auth, db } from "../firebase";
import { CARTS_DB } from "../constants/dbCollection";
import { getProductById } from "./productCotrollers";

const createCart = async () => {
  try {
    const currentUser = auth.currentUser;
    const docRef = doc(db, CARTS_DB, currentUser.uid);

    await setDoc(docRef, {});
  } catch (e) {
    throw new Error("Unable to create cart for current user.");
  }
};

const addProductToCart = async ({ userID, productID }) => {
  try {
    let productsList = [];

    const docRef = doc(db, CARTS_DB, userID);
    const cartInfo = await getDoc(docRef);

    if (cartInfo.exists()) {
      if (cartInfo.data().productsList) {
        //if cartInfo exists, and cart isn`t empty
        productsList = cartInfo.data().productsList;
      }
    }

    productsList.push(productID);

    await setDoc(docRef, {
      productsList,
    });
  } catch (e) {
    throw new Error("Can`t update cart information.");
  }
};

const getCartById = async ({ userID }) => {
  try {
    let productsList = [];
    let cart = [];

    const docRef = doc(db, CARTS_DB, userID);
    const cartInfo = await getDoc(docRef);

    if (cartInfo.exists()) {
      productsList = cartInfo.data().productsList;
    }

    const updateProductsInfo = async (elem) => {
      let productInfo = await getProductById(elem);
      cart.push({
        productID: elem,
        data: productInfo,
      });
    };

    if (productsList.length) {
      for (let elem of productsList) {
        await updateProductsInfo(elem);
      }
    }

    return cart;
  } catch (e) {
    throw new Error("Can`t update cart information.");
  }
};

const updateCart = async ({ productsList }) => {
  const currentUser = auth.currentUser;

  const docRef = doc(db, CARTS_DB, currentUser.uid);

  console.log(productsList);
  try {
    await setDoc(
      docRef,
      {
        productsList,
      },
      { merge: false }
    );
  } catch (e) {
    throw new Error("Can`t update cart information.");
  }
};

export { addProductToCart, getCartById, createCart, updateCart };
