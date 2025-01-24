import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import {
  addDays,
  eachDayOfInterval,
  endOfWeek,
  format,
  startOfWeek,
} from "date-fns";
import { useEffect, useState } from "react";
import { ITodos, ITodoTasks } from "../common/interfaces";
import { SuCheckBox } from "../components/SuCheckBox";
import { getTodos, getTodoTasks } from "../services/service";

const TodoWeek = () => {
  const currentDate = new Date();

  const firstDayOfWeek = startOfWeek(currentDate);
  const lastDayOfWeek = endOfWeek(currentDate);
  const daysInWeek = eachDayOfInterval({
    start: firstDayOfWeek,
    end: lastDayOfWeek,
  });
  const today = format(currentDate, "dd.MM.yyyy");
  const previousDay = format(addDays(currentDate, -1), "dd.MM.yyyy");
  
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

  function checkTask(check: boolean) {
    return check ? (
      <CheckIcon color="success" sx={{ fontSize: 17 }}></CheckIcon>
    ) : (
      <ClearIcon color="error" sx={{ fontSize: 15 }}></ClearIcon>
    );
  }

  return (
    <>
      {daysInWeek.map((day, index) => {
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
                        secondaryAction={
                          <>
                            {(dateKey === today || dateKey === previousDay) &&
                            !check ? (
                              <IconButton edge="end" color="success">
                                <SuCheckBox
                                  key={index}
                                  todoName={item.todoName}
                                  todoDate={dateKey}
                                  isCompleted={1}
                                />
                              </IconButton>
                            ) : (
                              checkTask(check)
                            )}
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
          </Grid>
        );
      })}
    </>
  );
};

export default TodoWeek;
