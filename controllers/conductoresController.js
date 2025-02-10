const connection = require('../config/dbConfig');

const getConductores = (req, res) => {
  connection.query('SELECT * FROM conductor', (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
};

const getConductorById = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM conductor WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Conductor no encontrado' });
    } else {
      res.json(results[0]);
    }
  });
};

const addConductor = (req, res) => {
  const { nombres, apellidos, numero_licencia, telefono, correo } = req.body;
  connection.query('INSERT INTO conductor (nombres, apellidos, numero_licencia, telefono, correo) VALUES (?, ?, ?, ?, ?)', [nombres, apellidos, numero_licencia, telefono, correo], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(201).json({ id: result.insertId, nombres, apellidos, numero_licencia, telefono, correo });
    }
  });
};

const updateConductor = (req, res) => {
  const { id } = req.params;
  const { nombres, apellidos, numero_licencia, telefono, correo } = req.body;
  connection.query('UPDATE conductor SET nombres = ?, apellidos = ?, numero_licencia = ?, telefono = ?, correo = ? WHERE id = ?', [nombres, apellidos, numero_licencia, telefono, correo, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Conductor no encontrado' });
    } else {
      res.json({ id, nombres, apellidos, numero_licencia, telefono, correo });
    }
  });
};

const deleteConductor = (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM conductor WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Conductor no encontrado' });
    } else {
      res.status(204).send();
    }
  });
};

module.exports = { getConductores, getConductorById, addConductor, updateConductor, deleteConductor };