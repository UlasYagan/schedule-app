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

const TodoList = () => {
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
        <List>
          <ListItem
            secondaryAction={<IconButton edge="end"></IconButton>}
            sx={{
              p: 1,
            }}
          >
            <ListItemText>{"item"}</ListItemText>
          </ListItem>
          <Divider />
          <ListItem
            secondaryAction={<IconButton edge="end"></IconButton>}
            sx={{
              p: 1,
            }}
          >
            <ListItemText>{"item"}</ListItemText>
          </ListItem>
          <Divider />
          <ListItem
            secondaryAction={<IconButton edge="end"></IconButton>}
            sx={{
              p: 1,
            }}
          >
            <ListItemText>{"item"}</ListItemText>
          </ListItem>
          <Divider />
          <ListItem
            secondaryAction={<IconButton edge="end"></IconButton>}
            sx={{
              p: 1,
            }}
          >
            <ListItemText>{"item"}</ListItemText>
          </ListItem>
          <Divider />
        </List>
      </Paper>
    </Grid>
  );
};

export default TodoList;
