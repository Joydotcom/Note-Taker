const { v4: uuidv4 } = require("uuid");
const fs = require("fs");


module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    let notesData = fs.readFileSync("db/db.json", "utf8");
    notesData = JSON.parse(notesData);

    res.json(notesData);
  });

  app.post("/api/notes", (req, res) => {
    
    let notesData = fs.readFileSync("db/db.json", "utf8");
    notesData = JSON.parse(notesData);

    
    const newNote = req.body;

    
    newNote.id = uuidv4();

    
    notesData.push(newNote);

    
    fs.writeFileSync("db/db.json", JSON.stringify(notesData), "utf8");

    res.json(true);
  });


  app.post("/api/clear", (req, res) => {
    
    notesData.length = 0;

    res.json({ ok: true });
  });
};
