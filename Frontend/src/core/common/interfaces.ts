import { Severity, Variant } from "./enums";
import { HORIZONTAL_TYPES, VERTICAL_TYPES } from "./types";

export interface INotification {
  message?: string;
  severity?: Severity;
  duration?: number;
  variant?: Variant;
}

export interface AnchorOrigin {
  vertical: VERTICAL_TYPES;
  horizontal: HORIZONTAL_TYPES;
}

export interface IDialogBase {
  // title?: string;
  // subTitle?: string;
}