import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { INotification } from "../common/interfaces";
import { isNil } from "../common/utils";
import { Severity, Variant } from "../common/enums";

export interface ISuNotificationProps extends INotification {}

export interface ISuNotificationHandles extends INotification {
  error: (message: string) => void;
  info: (message: string) => void;
  success: (message: string) => void;
  warning: (message: string) => void;
  hide: () => void;
}

const SuNotificationComponent: React.ForwardRefRenderFunction<
  ISuNotificationHandles,
  ISuNotificationProps
> = (props, ref) => {
  const getStateFromProps = (): INotification => {
    return {
      message: props.message,
      duration: !isNil(props.duration) ? props.duration : 3000,
      variant: !isNil(props.variant) ? props.variant : Variant.filled,
    };
  };

  const initialStateFromProps = getStateFromProps();
  const [state] = useState(initialStateFromProps);
  const [open, setOpen] = useState(false);

  const error = (message?: string) => {
    state.message = message;
    state.severity = Severity.error;
    setOpen(true);
  };
  const info = (message: string) => {
    state.message = message;
    state.severity = Severity.info;
    setOpen(true);
  };
  const success = (message: string) => {
    state.message = message;
    state.severity = Severity.success;
    setOpen(true);
  };
  const warning = (message: string) => {
    state.message = message;
    state.severity = Severity.warning;
    setOpen(true);
  };

  const hide = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useImperativeHandle(ref, () => {
    return {
      info,
      success,
      warning,
      error,
      hide,
      get message() {
        return state.message!;
      },
      set message(val: string) {
        state.message = val;
      },
    };
  });

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={state.duration}
        onClose={hide}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={hide}
          severity={state.severity}
          variant={state.variant}
          sx={{ width: "100%" }}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export const SuNotification = forwardRef(SuNotificationComponent);
