// apiRoutes.js
import express from "express";
import db from "./db.js";

const router = express.Router();

router.get("/categories", (req, res) => {
  const q = `SELECT name, icon FROM categories`;

  db.all(q, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200);
    res.json(rows);
  });
});

router.get("/categories/:category_id", (req, res) => {
  const categoryId = req.params.category_id;
  const q = `SELECT name, icon FROM categories WHERE id = ?`;

  db.get(q, [categoryId], (err, row) => {
    console.log(`Fetching category with id ${categoryId}`);
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!row) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    console.log("[OK] done");
    res.status(200);
    res.json(row);
  });
});


router.get("/links", (req, res) => {
  const q = `SELECT * FROM links`;

  db.all(q, (err, rows) => {
    console.log("fetching links");
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log("[OK] done");
    res.json(rows);
    res.status(200);
  });
});

router.get("/links/:link_id", (req, res) => {
  const linkId = req.params.link_id;
  const q = `SELECT * FROM links WHERE id = ?`;

  db.get(q, [linkId], (err, row) => {
    console.log(`Fetching link with id ${linkId}`);
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!row) {
      res.status(404).json({ error: "Link not found" });
      return;
    }

    console.log("[OK] done");
    res.json(row);
    res.status(200);
  });
});

router.get("/links/:link_id/delete", (req, res) => {
  const linkId = req.params.link_id;
  const q = `DELETE FROM links WHERE id = ?`;

  db.get(q, [linkId], (err, row) => {
    console.log(`Fetching link with id ${linkId}`);
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!row) {
      res.status(404).json({ error: "Link not found" });
      return;
    }

    console.log("[OK] done");
    res.json(row);
    res.status(200);
  });
});

export default router;
