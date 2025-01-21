import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useState } from "react";
import { ITodos } from "../common/interfaces";
import { isNil } from "../common/utils";
import { getTodos, removeTodoById } from "../services/service";
import {
  ISuNotificationHandles,
  SuNotification,
} from "../core/components/SuNotification";

const TodoList = () => {
  const refSuNotification = useRef<ISuNotificationHandles>(null);

  const [todoForm, setTodoForm] = useState<ITodos>({
    isActive: 1,
  });

  const [todoListResult, setTodoListResult] = useState<ITodos[]>([]);

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
      } else {
        const { name, value } = e.target;
        setTodoForm({
          ...todoForm,
          [name]: value,
        });
      }
    } catch (err) {}
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
        <TextField
          name="todoName"
          id="standard-basic"
          label="task name"
          variant="standard"
          onChange={handleChange}
        />
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
