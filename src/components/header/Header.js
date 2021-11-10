import React from "react";
import { useSelector } from "react-redux";

import GuestHeader from "./GuestHeader";
import UserHeader from "./UserHeader";
import { selectUserInfo } from "../../redux/common/userInfo/selectors";

export default function Header() {
  const userInfo = useSelector(selectUserInfo);

  return (
    <div>{userInfo.isAuthenticated ? <UserHeader /> : <GuestHeader />}</div>
  );
}
