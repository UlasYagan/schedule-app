import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";
import { useEffect, useState } from "react";
import { ITodos, ITodoTasks } from "../common/interfaces";
import { getTodos, getTodoTasks } from "../services/service";

const TodoMonth = () => {
  const currentDate = new Date();

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const [todoListResult, setTodoListResult] = useState<ITodos[]>([]);
  const [todoTasksResult, setTodoTasksResult] = useState<ITodoTasks[]>([]);

  useEffect(() => {
    let isSubscribed = true;
    const data = async () => {
      const result = await getTodos();
      setTodoListResult(result);

      const tasks = await getTodoTasks();
      setTodoTasksResult(tasks);
    };
    if (isSubscribed) {
      data();
    }
    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <>
      {daysInMonth.map((day, index) => {
        const dateKey = format(day, "dd.MM.yyyy");

        return (
          <Grid item xs={12} md={4} lg={3} key={index}>
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
                <b>
                  {format(day, "EEE")} - {dateKey}
                </b>
              </Box>
              <List>
                {todoListResult.map((item, index) => {
                  const check =
                    todoTasksResult.filter((c) => {
                      return (
                        c.todoName === item.todoName &&
                        c.todoDate === dateKey &&
                        c.isCompleted === 1
                      );
                    }).length > 0;

                  return (
                    <>
                      <ListItem
                        key={index}
                        sx={{
                          p: 1,
                          color: "white",
                          backgroundColor: check ? "#4fc703" : "#853565",
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
      })}
    </>
  );
};

export default TodoMonth;
