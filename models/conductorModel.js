const connection = require('../config/dbConfig');

const getConductores = (callback) => {
  connection.query('SELECT * FROM conductor', (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getConductorById = (id, callback) => {
  connection.query('SELECT * FROM conductor WHERE id = ?', [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else if (results.length === 0) {
      callback(new Error('Conductor no encontrado'), null);
    } else {
      callback(null, results[0]);
    }
  });
};

const addConductor = (conductor, callback) => {
  const { nombres, apellidos, numero_licencia, telefono, correo } = conductor;
  connection.query('INSERT INTO conductor (nombres, apellidos, numero_licencia, telefono, correo) VALUES (?, ?, ?, ?, ?)', [nombres, apellidos, numero_licencia, telefono, correo], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { id: result.insertId, nombres, apellidos, numero_licencia, telefono, correo });
    }
  });
};

const updateConductor = (id, conductor, callback) => {
  const { nombres, apellidos, numero_licencia, telefono, correo } = conductor;
  connection.query('UPDATE conductor SET nombres = ?, apellidos = ?, numero_licencia = ?, telefono = ?, correo = ? WHERE id = ?', [nombres, apellidos, numero_licencia, telefono, correo, id], (err, result) => {
    if (err) {
      callback(err, null);
    } else if (result.affectedRows === 0) {
      callback(new Error('Conductor no encontrado'), null);
    } else {
      callback(null, { id, nombres, apellidos, numero_licencia, telefono, correo });
    }
  });
};

const deleteConductor = (id, callback) => {
  connection.query('DELETE FROM conductor WHERE id = ?', [id], (err, result) => {
    if (err) {
      callback(err, null);
    } else if (result.affectedRows === 0) {
      callback(new Error('Conductor no encontrado'), null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = { getConductores, getConductorById, addConductor, updateConductor, deleteConductor };
