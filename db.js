// db.js
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(
  "./startpage.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error("Error opening db:", err.message);
    } else {
      console.log("Succesfully connected to db.");
    }
  }
);

export default db;
