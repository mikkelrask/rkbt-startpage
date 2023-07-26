// apiRoutes.js
import express from "express";
import db from "./db.js";

const router = express.Router();

// Define your API endpoints here
router.get("/categories", (req, res) => {
  const q = `SELECT name, icon FROM categories`;

  db.all(q, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json(rows);
  });
});

router.get("/links", (req, res) => {
  const q = `SELECT * FROM links`;

  db.all(q, (err, rows) => {
    console.log("fetching links...");
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log("done");
    res.json(rows);
  });
});

export default router;
