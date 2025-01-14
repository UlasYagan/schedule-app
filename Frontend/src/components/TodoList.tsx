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
import { useEffect, useState } from "react";
import { ITodos } from "../common/interfaces";
import { addDays, format } from "date-fns";
import { isNil } from "../common/utils";
import { addTodo, getTodos, removeTodos } from "../services/service";

const TodoList = () => {
  const [state, setState] = useState<ITodos>({
    todoName: "",
    days: 0,
    timeless: 0,
    startDate: "",
    endDate: "",
    isActive: 1,
  });

  const [todoListResult, setTodoListResult] = useState<ITodos[]>([]);

  useEffect(() => {
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
  }, []);

  const handleChange = (e: any) => {
    if (
      e.target.name === "days" &&
      !isNil(e.target.value) &&
      Number(e.target.value) > 0
    ) {
      const day = Number(e.target.value);
      const currentDate = new Date();
      const startDate = format(currentDate, "yyyy-MM-dd");
      const endDate = format(addDays(currentDate, day), "yyyy-MM-dd");

      setState({
        ...state,
        startDate,
        endDate,
      });
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async () => {
    if (
      !isNil(state.todoName) &&
      !isNil(state.startDate) &&
      !isNil(state.endDate)
    ) {
      await addTodo(state);
      const result = await getTodos();
      setTodoListResult(result);
    }
  };

  const handleDelete = async () => {
    await removeTodos();
    const result = await getTodos();
    setTodoListResult(result);
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
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "30ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            name="todoName"
            id="standard-basic"
            label="task name"
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            id="outlined-number"
            name="days"
            label="days"
            type="number"
            variant="standard"
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
          <Button variant="outlined" onClick={handleSubmit}>
            save
          </Button>
          <Button
            sx={{ display: "none" }}
            variant="outlined"
            onClick={handleDelete}
          >
            delete
          </Button>
        </Box>
        <List>
          {todoListResult.map((item, index) => {
            return (
              <>
                <ListItem
                  key={index}
                  secondaryAction={<IconButton edge="end"></IconButton>}
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
    </Grid>
  );
};

export default TodoList;
