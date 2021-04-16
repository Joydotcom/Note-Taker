// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on notes-data.

//const notesData = require('../db/db.json');

const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
// ROUTING

module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    let notesData = fs.readFileSync("db/db.json", "utf8");
    notesData = JSON.parse(notesData);

    res.json(notesData);
  });

  app.post("/api/notes", (req, res) => {
    // read the notesData array from the db.json file
    let notesData = fs.readFileSync("db/db.json", "utf8");
    notesData = JSON.parse(notesData);

    // get the note data from the req body
    const newNote = req.body;

    //generate a unique id and add it to your new note
    newNote.id = uuidv4();

    // push the new note to the notesData array
    notesData.push(newNote);

    // write the notesData array back to the db.json file.
    fs.writeFileSync("db/db.json", JSON.stringify(notesData), "utf8");

    res.json(true);
  });

  // I added this below code so you could clear out the notes while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", (req, res) => {
    // Empty out the arrays of data
    notesData.length = 0;

    res.json({ ok: true });
  });
};
