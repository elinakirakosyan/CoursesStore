import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteDialog({onDelete, onCancel}) {

    return (
        <Dialog
            open={true}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Delete course!"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you want to delete this course?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onCancel()}>Cancel</Button>
                <Button onClick={() => onDelete()} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}