import initialState from "../../initialState";
import {handleActions} from "redux-actions";
import {USER_LOGGED_IN, USER_LOGGED_OUT} from "../../actionTypes";

const initial = initialState.userInfo;

const reducer = handleActions(
    {
        [USER_LOGGED_IN]: (state ={}, {payload}) => {
            return {
                ...state,
                isAuthenticated: true,
                userName: payload.userName,
                avatarUrl: payload.avatarUrl,
                userID: payload.userID,
                email: payload.email
            }
        },
        [USER_LOGGED_OUT]: (state) =>{
            return {
                ...state,
                isAuthenticated: false,
                userName: '',
                avatarUrl: '',
                userID: '',
                email: ''
            }
        }
    },
    initial
)

export default reducer;