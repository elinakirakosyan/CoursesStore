import {handleActions} from "redux-actions";

import initialState from "../../initialState";
import {
    ACTIVATE_ABOUT_MENU,
    ACTIVATE_ADDITEM_MENU,
    ACTIVATE_CART_MENU,
    ACTIVATE_MYPRODUCTS_MENU,
    ACTIVATE_STORE_MENU
} from "../../actionTypes";

const initial = initialState.menuStatus;

const reducer = handleActions(
    {
        [ACTIVATE_STORE_MENU]: (state ={}, {payload}) => {
            return {
                ...state,
                storeMenuStatus: true,
                aboutMenuStatus: false,
                myProductsMenuStatus: false,
                addItemMenuStatus: false,
                cartMenuStatus: false
            }
        },
        [ACTIVATE_ABOUT_MENU]: (state ={}) =>{
            return {
                ...state,
                storeMenuStatus: false,
                aboutMenuStatus: true,
                myProductsMenuStatus: false,
                addItemMenuStatus: false,
                cartMenuStatus: false
            }
        },
        [ACTIVATE_CART_MENU]: (state ={}) => {
            return {
                ...state,
                storeMenuStatus: false,
                aboutMenuStatus: false,
                myProductsMenuStatus: false,
                addItemMenuStatus: false,
                cartMenuStatus: true
            }
        },
        [ACTIVATE_ADDITEM_MENU]: (state ={}) => {
            return {
                ...state,
                storeMenuStatus: false,
                aboutMenuStatus: false,
                myProductsMenuStatus: false,
                addItemMenuStatus: true,
                cartMenuStatus: false
            }
        },
        [ACTIVATE_MYPRODUCTS_MENU]: (state ={}) => {
            return {
                ...state,
                storeMenuStatus: false,
                aboutMenuStatus: false,
                myProductsMenuStatus: true,
                addItemMenuStatus: false,
                cartMenuStatus: false
            }
        },
    },
    initial
)

export default reducer;