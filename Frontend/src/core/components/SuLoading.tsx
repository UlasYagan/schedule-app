import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export interface ISuLoadingProps {}

export interface ISuLoadingHandles {
  showLoading: () => void;
  hideLoading: () => void;
}

const SuLoadingComponent: React.ForwardRefRenderFunction<ISuLoadingHandles, ISuLoadingProps> = (props, ref) => {
  const [open, setOpen] = useState(false);

  const showLoading = () => {
    setOpen(true);
  };

  const hideLoading = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => {
    return {
      showLoading,
      hideLoading,
    };
  });

  return (
    <>
      <Backdrop
        sx={(theme) => ({
          backgroundColor: "rgb(245 247 247 / 58%)",
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={open}
      >
        <CircularProgress color="info" />
      </Backdrop>
    </>
  );
};

export const SuLoading = forwardRef(SuLoadingComponent);
