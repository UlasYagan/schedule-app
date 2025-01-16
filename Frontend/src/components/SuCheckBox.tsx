import { Checkbox } from "@mui/material";
import React, { forwardRef, useState } from "react";
import { ITodoTasks } from "../common/interfaces";
import { isNil } from "../common/utils";
import { addTodoTask, getTodoTasksWithParams } from "../services/service";

export interface ISuCheckBoxProps {
  id?: number;
  todoName?: string;
  todoDate?: string;
  isCompleted: number;
}

export interface ISuCheckBoxHandles {
  id?: number;
  todoName?: string;
  todoDate?: string;
  isCompleted: number;
}

const SuCheckBoxComponent: React.ForwardRefRenderFunction<
  ISuCheckBoxHandles,
  ISuCheckBoxProps
> = (props, ref) => {
  const getStateFromProps = (): ITodoTasks => {
    return {
      todoName: props.todoName,
      todoDate: props.todoDate,
      isCompleted: props.isCompleted,
    };
  };

  const initialStateFromProps = getStateFromProps();
  const [state] = useState(initialStateFromProps);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && !isNil(state.todoName) && !isNil(state.todoDate)) {
      const taskList = await getTodoTasksWithParams(
        state.todoName!,
        state.todoDate!
      );
      if (taskList.length < 1) {
        await addTodoTask(state);
      }
    }
  };

  return (
    <Checkbox
      onChange={handleChange}
      sx={{
        pt: 1,
        "& .MuiSvgIcon-root": { fontSize: 15 },
      }}
    />
  );
};

export const SuCheckBox = forwardRef(SuCheckBoxComponent);
