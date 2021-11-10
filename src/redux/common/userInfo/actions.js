import {createAction} from "redux-actions";
import {USER_LOGGED_IN, USER_LOGGED_OUT} from "../../actionTypes";

const setUserInfo = createAction(USER_LOGGED_IN);
const userLoggedOut = createAction(USER_LOGGED_OUT);

export {setUserInfo, userLoggedOut};