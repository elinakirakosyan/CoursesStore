import React from "react";

export const BuyBtnContext = React.createContext({
    onCancel: () => {},
    onSignIn: () => {}
})