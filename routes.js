// apiRoutes.js
import express from "express";
import bodyParser from "body-parser";
import db from "./db.js";

const router = express.Router();
router.use(bodyParser.json());

router.get("/info", (req, res) => {
  const q = `SELECT * FROM info`;

  db.get(q, (err, row) => {
    console.log("fetching info");
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log("[200] fetched info");
    res.json(row);
    res.status(200);
  });
});

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
          reject("No categories found 🚯");
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
            reject("Category not found 🚯");
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
            reject("No links found 🚯");
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
    console.log("[OK] done ✅");
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
  const deleteQ = `DELETE FROM links WHERE id = ?`;
  const updateQ = `UPDATE info SET lastUpdated = date('now')`;
  const selectQ = `SELECT id FROM links WHERE id = ?`;

  db.serialize(() => {
    // Check if the linkId exists in the links table
    db.get(selectQ, [linkId], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      if (!row) {
        // If the linkId does not exist in the links table, return a 404 response
        console.log(`[404] Link with id ${linkId} not found 🚯`);
        res.status(404).json({ error: `Link with id ${linkId} not found 🚯` });
        return;
      }

      // If the linkId exists, proceed with the deletion and update
      db.run(deleteQ, [linkId], (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        // Perform the update within a separate transaction
        db.run(updateQ, (err) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }

          console.log(`[200] Link {id: ${linkId}} deleted ☠️`);
          res.status(200).json({ linkId: "☠️" });
        });
      });
    });
  });
});

router.post("/links", (req, res) => {
  const { title, url, category_id } = req.body;
  const q = `INSERT INTO links (title, url, category_id) VALUES (?, ?, ?)`;
  const updated = `UPDATE info SET lastUpdated = (date('now'))`;

  db.run(q, [title, url, category_id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // Use this.changes inside the callback instead
    if (this.changes === 0) {
      res.status(500).json({ error: "No rows inserted" });
      return;
    }

    db.run(updated, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.status(201).json({ message: "Link created" });
    });
  });
});

//pdate a link
router.put("/links/:link_id", (req, res) => {
  const linkId = req.params.link_id;
  const { title, url, category_id } = req.body;
  const q = `UPDATE links SET title = ?, url = ?, category_id = ? WHERE id = ?`;
  const updated = `UPDATE info SET lastUpdated = (date('now'))`;
  db.run(q, [title, url, category_id, linkId], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(500).json({ error: "No rows updated" });
      return;
    }
    db.run(updated, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
    });
    res.status(200).json({ message: "Link updated" });
  });
});

export default router;
