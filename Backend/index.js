import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./server.js";
import url from 'url';
import querystring from 'querystring';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200);
  res.send("schedule-app service is online");
});

//#region todotasklist services

app.get("/api/todotaskbyid", (req, res) => {
  res.set("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const id = req.query.id;
  const sql = `SELECT * FROM TodoTaskList WHERE id=?`;
  try {
    db.all(sql, [id], (err, rows) => {
      if (err) {
        throw err;
      }
      let content = JSON.stringify(rows);
      res.send(content);
      res.status(200);
    });
  } catch (err) {
    console.log(err);
    res.status(467);
    res.send(`{"code: 467, "status":"${err.message}"}`);
  }
});

app.get("/api/todotasklistwithparams", (req, res) => {
  res.set("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const todoName = req.query.todoName;
  const todoDate = req.query.todoDate;
  const sql = `SELECT * FROM TodoTaskList WHERE todoName=? and todoDate=?`;
  try {
    db.all(sql, [todoName, todoDate], (err, rows) => {
      if (err) {
        throw err;
      }
      let content = JSON.stringify(rows);
      res.send(content);
      res.status(200);
    });
  } catch (err) {
    console.log(err);
    res.status(467);
    res.send(`{"code: 467, "status":"${err.message}"}`);
  }
});

app.get("/api/todotasklist", (req, res) => {
  res.set("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const sql = "SELECT * FROM TodoTaskList";
  //let data = { todoTasks: [] };
  try {
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      //   rows.forEach((row) => {
      //     data.todoTasks.push({
      //       id: row.id,
      //       todoName: row.todoName,
      //       todoDate: row.todoDate,
      //       isCompleted: row.isCompleted,
      //     });
      //   });
      let content = JSON.stringify(rows);
      res.send(content);
      res.status(200);
    });
  } catch (err) {
    console.log(err);
    res.status(467);
    res.send(`{"code: 467, "status":"${err.message}"}`);
  }
});

app.post("/api/todotasklist", (req, res) => {
  console.log(req.body);
  console.log("req.body post metod");
  res.set("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const sql = `INSERT INTO TodoTaskList(todoName, todoDate, isCompleted) VALUES(?, ?, ?)`;

  try {
    db.run(
      sql,
      [req.body.todoName, req.body.todoDate, req.body.isCompleted],
      (err, rows) => {
        if (err) throw err;

        res.status(201);
        let data = { status: 201, message: "TodoTaskList was saved" };
        let content = JSON.stringify(data);
        res.send(content);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(468);
    res.send(`{"code: 468, "status":"${err.message}"}`);
  }
});

//#endregion todotasklist services

//#region todolist services

app.get("/api/todolistbyid", (req, res) => {
  res.set("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const id = req.query.id;
  const sql = `SELECT * FROM TodoList WHERE todoId=?`;
  try {
    db.all(sql, [id], (err, rows) => {
      if (err) {
        throw err;
      }
      let content = JSON.stringify(rows);
      res.send(content);
      res.status(200);
    });
  } catch (err) {
    console.log(err);
    res.status(467);
    res.send(`{"code: 467, "status":"${err.message}"}`);
  }
});

app.get("/api/todolist", (req, res) => {
  res.set("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const sql = "SELECT * FROM TodoList";
  try {
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }

      let content = JSON.stringify(rows);
      res.send(content);
      res.status(200);
    });
  } catch (err) {
    console.log(err);
    res.status(467);
    res.send(`{"code: 467, "status":"${err.message}"}`);
  }
});

app.post("/api/todolist", (req, res) => {
  console.log(req.body);
  console.log("req.body post metod");
  res.set("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const sql = `INSERT INTO TodoList(todoName, days, timeless, startDate, endDate, isActive) VALUES(?, ?, ?, ?, ?, ?)`;

  try {
    db.run(
      sql,
      [
        req.body.todoName,
        req.body.days,
        req.body.timeless,
        req.body.startDate,
        req.body.endDate,
        req.body.isActive,
      ],
      (err, rows) => {
        if (err) throw err;

        res.status(201);
        let data = { status: 201, message: "todo was saved" };
        let content = JSON.stringify(data);
        res.send(content);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(468);
    res.send(`{"code: 468, "status":"${err.message}"}`);
  }
});

app.put("/api/todoisactive", (req, res) => {
  console.log(req.body);
  console.log("req.body put metod");
  res.set("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const sql = `UPDATE TodoList SET isActive = ? WHERE todoId = ?`;

  try {
    db.run(sql, [req.body.isActive, req.body.todoId], (err, rows) => {
      if (err) throw err;

      res.status(201);
      let data = { status: 201, message: "Product was edited" };
      let content = JSON.stringify(data);
      res.send(content);
    });
  } catch (err) {
    console.log(err);
    res.status(469);
    res.send(`{"code: 469, "status":"${err.message}"}`);
  }
});

app.put("/api/todolist", (req, res) => {
  console.log(req.body);
  console.log("req.body put metod");
  res.set("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const sql = `UPDATE TodoList
      SET todoName = ?,
          days = ?,
          timeless = ?,
          startDate = ?,
          endDate = ?,
          isActive = ?
     WHERE todoId = ?`;

  try {
    db.run(
      sql,
      [
        req.body.todoName,
        req.body.days,
        req.body.timeless,
        req.body.startDate,
        req.body.endDate,
        req.body.isActive,
        req.body.todoId,
      ],
      (err, rows) => {
        if (err) throw err;

        res.status(201);
        let data = { status: 201, message: "Product was edited" };
        let content = JSON.stringify(data);
        res.send(content);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(469);
    res.send(`{"code: 469, "status":"${err.message}"}`);
  }
});

app.delete("/api/todolistdelete", (req, res) => {
  res.set("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const sql = `DELETE FROM TodoList`;

  try {
    db.all(sql, [], (err) => {
      if (err) throw err;

      res.status(200);
      res.send(`{"message":"TodoList was removed"}`);
    });
  } catch (error) {
    console.log(err);
    res.status(470);
    res.send(`{"code: 470, "status":"${err.message}"}`);
  }
});

app.delete("/api/todolist", (req, res) => {
  res.set("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const sql = `DELETE FROM TodoList WHERE todoId=?`;
  console.log(req.query.todoId);

  try {
    db.run(sql, [req.query.todoId], (err) => {
      if (err) throw err;

      res.status(200);
      res.send(`{"message":"Product ${req.query.id} was removed"}`);
    });
  } catch (error) {
    console.log(err);
    res.status(470);
    res.send(`{"code: 470, "status":"${err.message}"}`);
  }
});

//#endregion todolist services

app.listen(3000, (err) => {
  if (err) {
    console.log("ERROR: ", err.message);
  }
  console.log("Listening on port 3000");
});
