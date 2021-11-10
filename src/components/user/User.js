import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import {
  ADD_ITEM_ROUTE,
  MAIN_ROUTE,
  USER_CART_ROUTE,
  USER_PRODUCTS_ROUTE,
  USER_PROFILE_ROUTE,
} from "../../constants/routes";
import { selectUserInfo } from "../../redux/common/userInfo/selectors";
import UserProfile from "./UserProfile";
import AddItem from "./AddItem";
import UsersProducts from "./UsersProducts";
import Cart from "./cart/Cart";

export default function User() {
  const userInfo = useSelector(selectUserInfo);
  const history = useHistory();

  useEffect(() => {
    if (!userInfo.isAuthenticated) {
      history.push(MAIN_ROUTE);
      return null;
    }
  });

  return (
    <div>
      <Switch>
        <Route exact path={USER_PROFILE_ROUTE}>
          <UserProfile />
        </Route>
        <Route path={ADD_ITEM_ROUTE}>
          <AddItem />
        </Route>
        <Route exact path={USER_PRODUCTS_ROUTE}>
          <UsersProducts />
        </Route>
        <Route exact path={USER_CART_ROUTE}>
          <Cart />
        </Route>
        <Redirect to={USER_PROFILE_ROUTE} />
      </Switch>
    </div>
  );
}
