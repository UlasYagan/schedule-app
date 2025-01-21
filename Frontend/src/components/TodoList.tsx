import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useState } from "react";
import { ITodos } from "../common/interfaces";
import { addDays, format } from "date-fns";
import { isNil } from "../common/utils";
import { addTodo, getTodos, removeTodoById } from "../services/service";
import { ISuNotificationHandles, SuNotification } from "../core/components/SuNotification";

const TodoList = () => {
  const refSuNotification = useRef<ISuNotificationHandles>(null);

  const [todoForm, setTodoForm] = useState<ITodos>({
    isActive: 1,
  });

  const [todoListResult, setTodoListResult] = useState<ITodos[]>([]);
  const currentDate = new Date();

  useEffect(() => {
    try {
      let isSubscribed = true;
      const data = async () => {
        const result = await getTodos();
        setTodoListResult(result);
      };
      if (isSubscribed) {
        data();
      }
      return () => {
        isSubscribed = false;
      };
    } catch (err) {
      refSuNotification.current!.error("There is an error");
    }
  }, []);

  const handleChange = (e: any) => {
    try {
      if (
        e.target.name === "days" &&
        !isNil(e.target.value) &&
        Number(e.target.value) > 0
      ) {
        const day = Number(e.target.value);
        const startDate = format(addDays(currentDate, -3), "yyyy-MM-dd");
        const endDate = format(addDays(currentDate, day), "yyyy-MM-dd");

        setTodoForm({
          ...todoForm,
          startDate,
          endDate,
        });
      } else {
        const { name, value } = e.target;
        setTodoForm({
          ...todoForm,
          [name]: value,
        });
      }
    } catch (err) {
      refSuNotification.current!.error("There is an error");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (
        !isNil(todoForm.todoName) &&
        !isNil(todoForm.startDate) &&
        !isNil(todoForm.endDate)
      ) {
        await addTodo(todoForm);
        const result = await getTodos();
        setTodoListResult(result);
      }

      refSuNotification.current!.success("Add Todo is succeed");
    } catch (err) {
      refSuNotification.current!.error("There is an error");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await removeTodoById(id);
      const result = await getTodos();
      setTodoListResult(result);

      refSuNotification.current!.success("Remove is succeed");
    } catch (err) {
      refSuNotification.current!.error("There is an error");
    }
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Paper
        sx={{
          p: 1,
          display: "flex",
          flexDirection: "column",
          border: "1px solid",
        }}
      >
        <Box
          sx={{
            height: "25px",
            textAlign: "center",
          }}
        >
          <b>{"Todo List"}</b>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            name="todoName"
            id="standard-basic"
            label="task name"
            variant="standard"
            value={todoForm.todoName}
            onChange={handleChange}
          />
          <TextField
            id="outlined-number"
            name="days"
            label="days"
            type="number"
            variant="standard"
            value={todoForm.days}
            onChange={handleChange}
          />
          <TextField
            id="standard-select-currency"
            name="timeless"
            select
            label="is it timeless"
            variant="standard"
            onChange={handleChange}
          >
            <MenuItem key={"yes"} value={1}>
              {"yes"}
            </MenuItem>
            <MenuItem key={"no"} value={0}>
              {"no"}
            </MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
        <List>
          {todoListResult.map((item, index) => {
            return (
              <>
                <ListItem
                  key={index}
                  secondaryAction={
                    <>
                      <IconButton
                        key="close"
                        color="error"
                        onClick={() => handleDelete(item.todoId!)}
                      >
                        <CloseIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    </>
                  }
                  sx={{
                    p: 1,
                  }}
                >
                  <ListItemText>{item.todoName}</ListItemText>
                </ListItem>
                <Divider />
              </>
            );
          })}
        </List>
      </Paper>
      <SuNotification ref={refSuNotification} />
    </Grid>
  );
};

export default TodoList;
