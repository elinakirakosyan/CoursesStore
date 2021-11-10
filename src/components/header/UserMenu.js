import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { signOut } from "firebase/auth";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import defAvatar from "../../assets/img/defAvatar.png";
import { useStyles } from "./headerStyles";
import { MAIN_ROUTE, USER_PROFILE_ROUTE } from "../../constants/routes";
import { selectUserInfo } from "../../redux/common/userInfo/selectors";
import { auth } from "../../firebase";
import { userLoggedOut } from "../../redux/common/userInfo/actions";
import { setRenderProject } from "../../redux/common/renderProject";

export default function UserMenu() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);

  const onLogOutHandler = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log("an error occurred while logged out");
    }

    dispatch(userLoggedOut());
    dispatch(setRenderProject());
    history.push(MAIN_ROUTE);
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <div {...bindTrigger(popupState)}>
            <img
              src={userInfo.avatarUrl ? userInfo.avatarUrl : defAvatar}
              alt="Avatar"
              className={classes.userAvatar}
            />
          </div>
          <Menu {...bindMenu(popupState)}>
            <div className={classes.userName}>
              {userInfo.userName}
              <hr />
            </div>

            <MenuItem onClick={popupState.close}>
              <Link className={classes.popupMenuLink} to={USER_PROFILE_ROUTE}>
                Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={popupState.close}>
              <span className={classes.popupMenuLink} onClick={onLogOutHandler}>
                Log Out
              </span>
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
