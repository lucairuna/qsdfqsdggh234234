const express = require('express');
const router = express.Router();
const pool = require('../database');

// POST /auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect.');
    }

    const user = rows[0];
    if (password !== user.password) {
      return res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect. 2');
    }

    // Connexion réussie
    res.status(200).send('Connexion réussie');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur du serveur.');
  }
});

module.exports = router;
