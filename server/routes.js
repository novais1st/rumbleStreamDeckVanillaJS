const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/buttons', (req, res) => {
  const filePath = path.join(__dirname, 'buttons.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading buttons.json');
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

router.post('/buttons/:id', (req, res) => {
  const { id } = req.params;
  const { labelButton } = req.body;

  const filePath = path.join(__dirname, 'buttons.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading buttons.json');
    }

    const buttonsData = JSON.parse(data);
    const button = buttonsData.find(btn => btn.id === Number(id));
    if (button) {
      button.labelButton = labelButton;

      fs.writeFile(filePath, JSON.stringify(buttonsData), 'utf8', err => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error writing to buttons.json');
        }
        res.sendStatus(200);
      });
    } else {
      res.status(404).send('Button not found');
    }
  });
});

module.exports = router;
