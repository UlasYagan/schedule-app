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

export interface IConfirmDialog {
  isOpen: boolean;
  title: string;
  subTitle: string;
}

export interface ITodos {
  todoId?: number;
  todoName?: string;
  days?: number;
  timeless?: number;
  startDate?: string;
  endDate?: string;
  isActive?: number;
}

export interface ITodoTasks {
  id?: number;
  todoName?: string;
  todoDate?: string;
  isCompleted: number;
}
