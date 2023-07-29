// apiRoutes.js
import express from "express";
import db from "./db.js";

const router = express.Router();

router.get("/categories", async (req, res) => {
  const categoryQ = `SELECT id, name, icon FROM categories`;
  const linkQ = `SELECT * FROM links WHERE category_id = ?`;

  try {
    const categories = await new Promise((resolve, reject) => {
      db.all(categoryQ, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        if (!rows || rows.length === 0) {
          reject("No categories found");
          return;
        }
        resolve(rows);
      });
    });

    const categoriesWithLinks = await Promise.all(
      categories.map(async (category) => {
        const { id, name, icon } = category;
        const links = await new Promise((resolve, reject) => {
          db.all(linkQ, [id], (err, rows) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(rows);
          });
        });
        return { id, name, icon, links };
      })
    );

    res.status(200).json(categoriesWithLinks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/category/:category_id", async (req, res) => {
  const categoryId = req.params.category_id;
  const categoryQ = `SELECT name, icon FROM categories WHERE id = ?`;
  const linkQ = `SELECT * FROM links WHERE category_id = ?`;

  try {
    const [category, links] = await Promise.all([
      new Promise((resolve, reject) => {
        db.get(categoryQ, [categoryId], (err, row) => {
          if (err) {
            reject(err);
            return;
          }
          if (!row) {
            reject("Category not found");
            return;
          }
          resolve(row);
        });
      }),
      new Promise((resolve, reject) => {
        db.all(linkQ, [categoryId], (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          if (!rows) {
            reject("No links found for category");
            return;
          }
          resolve(rows);
        });
      }),
    ]);
    res.status(200);
    const response = { category, links };

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
  const updated = `UPDATE info SET lastUpdate = (date('now'))`;

  db.(q, [linkId], (err, row) => {
    console.log(`Fetching link with id ${linkId}`);
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!row) {
      res.status(404).json({ error: "Link not found" });
      return;
    }
    db.post(updated, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
    });
    console.log("[OK] done");
    res.json(row);
    res.status(200);
  });
});

router.post("/links", (req, res) => {
  const { name, url, category_id } = req.body;
  const q = `INSERT INTO links (name, url, category_id) VALUES (?, ?, ?)`;
  const updated = `UPDATE info SET lastUpdate = (date('now'))`;

  db.run(q, [name, url, category_id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(500).json({ error: "No rows inserted" });
      return;
    }
    res.status(201).json({ message: "Link created" });
    router.post("/info", (req, res) => {
      db.run(updated, (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
      });
    });
  });
});

export default router;
