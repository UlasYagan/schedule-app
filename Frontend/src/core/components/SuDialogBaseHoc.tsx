import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IDialogBase } from "../common/interfaces";

export interface ISuDialogBaseHOCProps extends IDialogBase {}

export interface ISuDialogBaseHOCHandles extends IDialogBase  {
  showDialog: () => void;
  hideDialog: () => void;
}

export const withSuDialogBaseHOC = (Component: any) => {
  const wrappedComponent: React.ForwardRefRenderFunction<ISuDialogBaseHOCHandles, ISuDialogBaseHOCProps> = (props, ref) => {
    const [open, setOpen] = useState(false);

    const showDialog = () => {
       setOpen(true);
    };

    const hideDialog = () => {
       setOpen(false);
    };

    useImperativeHandle(ref, () => {
      return {
        showDialog,
        hideDialog,
      };
    });

    return (
      <>
        <Dialog
          onClose={hideDialog}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <IconButton
            aria-label="close"
            onClick={hideDialog}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Component {...props} ref={ref} />
          </DialogContent>
        </Dialog>
      </>
    );
  };

  return forwardRef(wrappedComponent);
};
