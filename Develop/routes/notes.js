const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {

  const data = fs.readFile("db/db.json", "utf8", function(err, data) {
  dataNotes = [].concat(JSON.parse(data));
  res.json(JSON.parse(data));
  });

});

router.post('/', (req, res) => {
    
  let newNote = fs.readFileSync("./db/db.json")
  newNote = JSON.parse(newNote);
    
  const { title, text } = req.body;
  
  if (title && text) {
  newNote.push({
    title,
    text,
    id: uuidv4(),
  });

  fs.writeFile('./db/db.json', JSON.stringify(newNote, null, 2), (err) => {
    if (err) {
      console.log(err)
    } else {
      res.status(200).send(newNote);
    }
  });

  }
});

router.delete('/:id', (req, res) => {

 var note = dataNotes.find(i => i.id === req.params.id);
  if (!note) return res.send("note not found");
  var index = dataNotes.indexOf(note);
  dataNotes.splice(index, 1);
  fs.writeFile("db/db.json", JSON.stringify(dataNotes), function(err, data) {
    console.log(err, data);
    res.send(true);
  });
  
});

module.exports = router;