import React, {useContext} from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import SignInForDialog from "./utils/SignInForDialog";
import {PAGE_PRIMARY_COLOR} from "../../constants/colors";
import {BuyBtnContext} from "../../contexts";

export default function LogInDialog() {
    const buyBtnContext = useContext(BuyBtnContext);

    return (
        <Dialog
            open={true}
            onClose={buyBtnContext.onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <h1 style={{textAlign: 'center', color: PAGE_PRIMARY_COLOR}}>Log In</h1>
            <DialogContent>
                <DialogContentText id="responsive-dialog-title">
                    <SignInForDialog />
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}