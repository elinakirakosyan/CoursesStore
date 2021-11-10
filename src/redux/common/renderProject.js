import {createAction} from "redux-actions";
import {RENDER_PROJECT} from "../actionTypes";
import initialState from "../initialState";
import {handleActions} from "redux-actions";

const setRenderProject = createAction(RENDER_PROJECT);

const initial = initialState.renderProject;

const renderProjectReducer = handleActions(
    {
        [RENDER_PROJECT]: (state) =>{
            return {
                ...state,
            }
        }
    },
    initial
)

const selectRenderProject = state => state.renderProject;

export {renderProjectReducer, setRenderProject, selectRenderProject};