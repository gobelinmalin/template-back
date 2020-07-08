const express = require('express');
const router = express.Router();
const connection  = require('../config');

// ajout d"une donnée
router.post('/', (req, res) => {

  const data = req.body;

  connection.query('INSERT INTO user SET ?', data, (err, results) => {
    if(err) {
      res.sendStatus(err)
    } else {
      res.sendStatus(200)
    }
  })
})

// récupération de liste
router.get('/', (req, res) => {
  connection.query('SELECT * FROM user', (err, results) => {
    if(err) {
      res.sendStatus(500)
    } else {
      res.json(results)
    }
  })
})

// récupération d"une donnée
router.get('/:id', (req, res) => {
  const idParams = req.params.id;
  connection.query('SELECT * FROM user WHERE id = ?', idParams, (err, results) => {
    if(err) {
      res.sendStatus(err)
    } else {
      res.json(results)
    }
  })
})

// modification d"une donnée
router.put('/:id', (req, res) => {

  const idParams = req.params.id;
  const data = req.body;

  connection.query('UPDATE user SET ? WHERE id = ?', [data, idParams], (err, results) => {
    if(err) {
      res.sendStatus(err)
    } else {
      res.sendStatus(200)
    }
  })
})

// suppression d"une donnée
router.delete('/:id', (req, res) => {

  const idParams = req.params.id;

  connection.query('DELETE FROM user WHERE id = ?', idParams, (err, results) => {
    if(err) {
      res.sendStatus(err)
    } else {
      res.sendStatus(200)
    }
  })
})

// recupération liste de donnée par rapport à une jointure
router.get('/:idUser/friends', (req, res) => {
  const idUser = req.params.idUser;

  connection.query('SELECT f.lastname, f.firstname FROM user_friend as uf JOIN friend as f ON f.id = uf.id_friend JOIN user as u ON u.id = uf.id_user WHERE u.id = ? ', idUser, (err, results) => {
    if(err) {
      res.sendStatus(500)
    } else {
      res.json(results)
    }
  })
})

module.exports = router; 