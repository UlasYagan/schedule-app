import sqlite3 from "sqlite3";

const sql3 = sqlite3.verbose();
const myProdDb = './myprod.db';
const myDevDb = './mydev.db';
const db = new sql3.Database(myDevDb, sqlite3.OPEN_READWRITE, connected);

function connected(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Created the db or db does already exist");
}

const sqlTodoList = `CREATE TABLE IF NOT EXISTS TodoList(
        todoId INTEGER PRIMARY KEY AUTOINCREMENT,
        todoName TEXT,
        days INTEGER,
        timeless INTEGER,
        startDate TEXT,
        endDate TEXT,
        isActive INTEGER
    )`;

db.run(sqlTodoList, [], (err) => {
  if (err) {
    console.log(err);

    console.log("error creating TodoList table");
    return;
  }
  console.log("created table");
});

const sqlTodoTaskList = `CREATE TABLE IF NOT EXISTS TodoTaskList(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    todoName TEXT,
    todoDate TEXT,
    isCompleted INTEGER
)`;

db.run(sqlTodoTaskList, [], (err) => {
  if (err) {
    console.log(err);
    console.log("error creating TodoTaskList table");
    return;
  }
  console.log("created table");
});

export default db;
