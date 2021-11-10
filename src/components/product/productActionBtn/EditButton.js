import React from "react";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";
import {EDIT_PRODUCT_ROUTE} from "../../../constants/routes";
import {
    EDIT_BTN_COLOR,
    EDIT_BTN_DARK_COLOR,
    PAGE_SECONDARY_COLOR
} from "../../../constants/colors";


const EditBtn = styled(Button)(() => ({
    color: PAGE_SECONDARY_COLOR,
    backgroundColor: EDIT_BTN_COLOR,
    borderRadius: 8,
    fontFamily: 'sans-serif',
    width: 60,
    height: 32,
    margin: 3,

    '&:hover': {
        backgroundColor: EDIT_BTN_DARK_COLOR,
    },
}));

export default function EditButton({productID}) {
    const history = useHistory();

    return (
        <EditBtn
            onClick={() => {
                history.push({
                    pathname: `${EDIT_PRODUCT_ROUTE}/:${productID}`,
                    state: {productID}
                });
            }}
        >
            Edit
        </EditBtn>
    )
}