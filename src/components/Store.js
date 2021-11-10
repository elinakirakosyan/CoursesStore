import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";

import { getAllProductsInfo } from "../controllers/productCotrollers";
import ProductCard from "./product/ProductCard";
import CustomCircularProgress from "./customized/CustomCircularProgress";
import { activateStoreMenu } from "../redux/common/menuStatus/actions";
import { selectUserInfo } from "../redux/common/userInfo/selectors";
import { TextField } from "@mui/material";

const useStyles = makeStyles(() => {
  return {
    wrapper: {
      margin: 10,
      padding: 10,
      display: "flex",
      flexFlow: "wrap",
      justifyContent: "space-around",
    },
    search: {
      display: "flex",
      justifyContent: "flex-end",
      padding: 15,
      "@media only screen and (max-width: 737px)": {
        justifyContent: "center",
      },
    },
    inputContainer: {
      backgroundColor: "white",
      width: 500,
    },
  };
});

export default function Store() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);

  const [allProducts, setAllProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getData = useCallback(async () => {
    try {
      const allProductsInfo = await getAllProductsInfo();
      setAllProducts(allProductsInfo);
    } catch (e) {
      console.log(e.message);
    }
  }, [setAllProducts]);

  useEffect(() => {
    dispatch(activateStoreMenu());
    getData();
  }, [getData, dispatch, userInfo.isAuthenticated]);

  useEffect(() => {
    setFilteredProducts(
      allProducts.filter((product) =>
        product.data.courseName
          .toLowerCase()
          .includes(searchValue.toLowerCase().trim())
      )
    );
  }, [allProducts, searchValue]);

  return (
    <>
      <div className={classes.search}>
        <TextField
          className={classes.inputContainer}
          id="outlined-basic"
          label="Search..."
          value={searchValue}
          onChange={(evt) => setSearchValue(evt.target.value)}
        />
      </div>
      <div className={classes.wrapper}>
        {filteredProducts.length ? (
          filteredProducts.map((elem) => (
            <ProductCard product={elem} key={elem.productID} />
          ))
        ) : (
          <CustomCircularProgress />
        )}
      </div>
      {/* <div className={classes.footer}>
        <Footer />
      </div> */}
    </>
  );
}
