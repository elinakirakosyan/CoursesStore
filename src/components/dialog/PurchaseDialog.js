import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {makeStyles} from "@mui/styles";
import TextField from '@mui/material/TextField';
import {StyledButtonDialog} from "./utils/StyledButtonDialog";

const useStyles = makeStyles(() => {
    return {
        container: {
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
        },
        header: {
            textAlign: "center"
        },
        purchaseInfo: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        purchaseInfoBlock:{
            display: "flex",
        },
        textFieldBlock: {
            margin: 2,
        },
        cardNumberBlock: {
            padding: 10,
            width: '100%',
            display: "flex",
            flexDirection:"column"
        },
        buttonSection: {
            display: "flex",
            justifyContent: "space-around",
        }
    }
})

export default function PurchaseDialog({price = 0, onCancel, onConfirm}) {
    const classes = useStyles();

    return (
        <Dialog
            open={true}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={classes.container}
        >
            <DialogTitle id="alert-dialog-title" className={classes.header}>
                Confirm Purchase
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <div className={classes.purchaseInfo}>
                        <div className={classes.purchaseInfoBlock}>
                            <span className={classes.textFieldBlock}><TextField id="outlined-basic" label="Owner" variant="outlined" className={classes.textField}/></span>
                            <span className={classes.textFieldBlock}><TextField id="outlined-basic" label="CVV" variant="outlined" className={classes.textField}/></span>
                        </div>

                        <div className={classes.cardNumberBlock}><TextField id="outlined-basic" label="Card Number" variant="outlined" className={classes.textField}/></div>
                    </div>

                    <div>
                        <p>Price: {price} $</p>
                    </div>

                    <div className={classes.buttonSection}>
                        <StyledButtonDialog variant="contained" onClick={() => onCancel()}>Cancel</StyledButtonDialog>
                        <StyledButtonDialog variant="contained" onClick={() => onConfirm()} autoFocus>Confirm</StyledButtonDialog>
                    </div>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}