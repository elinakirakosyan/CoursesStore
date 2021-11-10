import {createAction} from "redux-actions";
import {
    ACTIVATE_ABOUT_MENU,
    ACTIVATE_ADDITEM_MENU, ACTIVATE_CART_MENU,
    ACTIVATE_MYPRODUCTS_MENU,
    ACTIVATE_STORE_MENU
} from "../../actionTypes";

const activateStoreMenu = createAction(ACTIVATE_STORE_MENU);
const activateCartMenu = createAction(ACTIVATE_CART_MENU);
const activateAboutMenu = createAction(ACTIVATE_ABOUT_MENU);
const activateMyProductsMenu = createAction(ACTIVATE_MYPRODUCTS_MENU);
const activateAddItemMenu = createAction(ACTIVATE_ADDITEM_MENU);

export {
    activateStoreMenu,
    activateCartMenu,
    activateAboutMenu,
    activateMyProductsMenu,
    activateAddItemMenu
}