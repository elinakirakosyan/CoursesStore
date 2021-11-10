import React, {useState} from "react";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import {makeStyles} from "@mui/styles";

import {
    BUY_BTN_COLOR,
    BUY_BTN_DARK_COLOR,
    PAGE_SECONDARY_COLOR
} from "../../../constants/colors";
import PurchaseDialog from "../../dialog/PurchaseDialog";



const BuyBtnCart = styled(Button)(() => ({
    color: PAGE_SECONDARY_COLOR,
    backgroundColor: BUY_BTN_COLOR,
    borderRadius: 8,
    fontFamily: 'sans-serif',
    width: 60,
    height: 32,
    margin: 3,

    '&:hover': {
        backgroundColor: BUY_BTN_DARK_COLOR,
    },
}));

const useStyles = makeStyles(() => {
    return {
        wrapper:{
            margin: 0,
            padding: 0,
        }
    }
})

export default function BuyButtonCart({totalPrice}) {
    const classes = useStyles();
    const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);

    const onClick = () => {
        setShowPurchaseDialog(true);
    }

    return (
        <span className={classes.wrapper}>
            <BuyBtnCart
                onClick={() => onClick()}
            >
                Buy
            </BuyBtnCart>

            {
                showPurchaseDialog &&
                <PurchaseDialog
                    price={totalPrice}
                    onCancel={() => setShowPurchaseDialog(false)}
                    onConfirm={() => setShowPurchaseDialog(false)}
                />
            }

        </span>
    )
}