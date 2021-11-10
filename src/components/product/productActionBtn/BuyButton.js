import React, {useState} from "react";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import {makeStyles} from "@mui/styles";

import {
    BUY_BTN_COLOR,
    BUY_BTN_DARK_COLOR,
    PAGE_SECONDARY_COLOR
} from "../../../constants/colors";
import {auth} from "../../../firebase";
import LogInDialog from "../../dialog/LogInDialog";
import {BuyBtnContext} from "../../../contexts";
import PurchaseDialog from "../../dialog/PurchaseDialog";
import {getProductById} from "../../../controllers/productCotrollers";


const BuyBtn = styled(Button)(() => ({
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

export default function BuyButton({productID}) {
    const classes = useStyles();
    const [showLogInDialog, setShowLogInDialog] = useState(false);
    const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
    const [product, setProduct] = useState({});

    const onClick = async () => {
        const currentUser = auth.currentUser;
        const prod = await getProductById(productID);

        setProduct(prod);

        if(currentUser && currentUser.uid !== product.sellerID){
            setShowPurchaseDialog(true);

        }
        if(!currentUser){
            setShowLogInDialog(true);
        }
    }

    const onSignIn = () => {
        const currentUser = auth.currentUser;

        setShowLogInDialog(false);
        if(currentUser.uid !== product.sellerID){
            setShowPurchaseDialog(true);
        }
    }

    return (
        <span className={classes.wrapper}>
            <BuyBtn
                onClick={() => onClick()}
            >
                Buy
            </BuyBtn>

            {
                showLogInDialog &&
                <BuyBtnContext.Provider value={{
                    onCancel : () => {setShowLogInDialog(false)},
                    onSignIn : onSignIn
                }}>
                    <LogInDialog />
                </BuyBtnContext.Provider>
            }

            {
                showPurchaseDialog &&
                <PurchaseDialog
                    price={product.price}
                    onCancel={() => setShowPurchaseDialog(false)}
                    onConfirm={() => setShowPurchaseDialog(false)}
                />
            }

        </span>
    )
}