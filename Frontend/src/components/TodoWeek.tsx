import {
  Box,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";

const todoList = ["Sentences", "Reading", "Open English", "Grammer"];

const TodoWeek = () => {
  const currentDate = new Date();

  const firstDayOfWeek = startOfWeek(currentDate);
  const lastDayOfWeek = endOfWeek(currentDate);

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const daysInWeek = eachDayOfInterval({
    start: firstDayOfWeek,
    end: lastDayOfWeek,
  });

  const startingDayIndex = getDay(firstDayOfWeek);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debugger;
    console.log(e.target.checked);
  };

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
                {todoList.map((item, index) => {
                  return (
                    <>
                      <ListItem
                        key={index}
                        secondaryAction={
                          <IconButton edge="end">
                            <Checkbox
                              key={index}
                              onChange={handleChange}
                              sx={{
                                pt: 1,
                                "& .MuiSvgIcon-root": { fontSize: 15 },
                              }}
                            />
                          </IconButton>
                        }
                        sx={{
                          p: 1,
                        }}
                      >
                        <ListItemText>{item}</ListItemText>
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
