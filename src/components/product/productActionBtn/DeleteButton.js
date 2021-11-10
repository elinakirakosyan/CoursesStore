import React from "react";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import {
    DELETE_BTN_COLOR,
    DELETE_BTN_DARK_COLOR,
    PAGE_SECONDARY_COLOR
} from "../../../constants/colors";


const DeleteBtn = styled(Button)(() => ({
    color: PAGE_SECONDARY_COLOR,
    backgroundColor: DELETE_BTN_COLOR,
    borderRadius: 8,
    fontFamily: 'sans-serif',
    width: 60,
    height: 32,
    margin: 3,

    '&:hover': {
        backgroundColor: DELETE_BTN_DARK_COLOR,
    },
}));

export default function DeleteButton({onClick}) {
    return (
        <DeleteBtn onClick={onClick}>Delete</DeleteBtn>
    )
}