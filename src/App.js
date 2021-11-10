import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  ABOUT_ROUTE,
  EDIT_PRODUCT_ROUTE,
  LOG_IN_ROUTE,
  MAIN_ROUTE,
  PRODUCT_INFO_ROUTE,
  USER_ROUTE,
} from "./constants/routes";
import { setUserInfo, userLoggedOut } from "./redux/common/userInfo/actions";
import { auth } from "./firebase";
import { selectRenderProject } from "./redux/common/renderProject";
import Store from "./components/Store";
import About from "./components/about/About";
import Auth from "./components/auth/Auth";
import Header from "./components/header/Header";
import User from "./components/user/User";
import EditProduct from "./components/product/EditProduct";
import ProductInfo from "./components/product/ProductInfo";

function App() {
  const dispatch = useDispatch();
  const renderProject = useSelector(selectRenderProject);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName) {
          dispatch(
            setUserInfo({
              email: user.email,
              userID: user.uid,
              userName: user.displayName,
              avatarUrl: user.photoURL,
            })
          );
        }
      } else {
        dispatch(userLoggedOut());
      }
    });
  }, [dispatch, renderProject]);

  return (
    <div>
      <div style={{ position: "sticky", top: 0, width: "100%", zIndex: 1 }}>
        <Header />
      </div>

      <div style={{ zIndex: 0 }}>
        <Switch>
          <Route exact path={MAIN_ROUTE}>
            <Store />
          </Route>
          <Route exact path={ABOUT_ROUTE}>
            <About />
          </Route>
          <Route exact path={LOG_IN_ROUTE}>
            <Auth />
          </Route>
          <Route path={USER_ROUTE}>
            <User />
          </Route>
          <Route
            path={EDIT_PRODUCT_ROUTE}
            render={(props) => {
              return <EditProduct id={props.location.state} />;
            }}
          />
          <Route
            path={PRODUCT_INFO_ROUTE}
            render={(props) => {
              return <ProductInfo id={props.location.state} />;
            }}
          />
          <Redirect to={MAIN_ROUTE} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
