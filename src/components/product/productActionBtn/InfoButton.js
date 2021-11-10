import React from "react";
import {useHistory} from "react-router-dom";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import {
    PAGE_PRIMARY_COLOR,
    PAGE_PRIMARY_COLOR_DARK,
    PAGE_SECONDARY_COLOR
} from "../../../constants/colors";
import {PRODUCT_INFO_ROUTE} from "../../../constants/routes";

const InfoBtn = styled(Button)(() => ({
    color: PAGE_SECONDARY_COLOR,
    backgroundColor: PAGE_PRIMARY_COLOR,
    borderRadius: 8,
    fontFamily: 'sans-serif',
    width: 60,
    height: 32,
    margin: 3,

    '&:hover': {
        backgroundColor: PAGE_PRIMARY_COLOR_DARK,
    },
}));

export default function InfoButton({productID}) {
    const history = useHistory();

    return (
        <InfoBtn
            onClick={() => {
                history.push({
                    pathname: `${PRODUCT_INFO_ROUTE}/${productID}`,
                    state: {productID}
                });
            }}
        >
            Info
        </InfoBtn>
    )
}