const connection = require('../config/dbConfig');

const getRutasProgramadas = (req, res) => {
  const { vehiculo, conductor, fecha } = req.query;
  let query = 'SELECT * FROM ruta_programada WHERE 1=1';
  const queryParams = [];
  
  if (vehiculo) {
    query += ' AND vehiculo_placa = ?';
    queryParams.push(vehiculo);
  }
  
  if (conductor) {
    query += ' AND conductor_id = ?';
    queryParams.push(conductor);
  }
  
  if (fecha) {
    query += ' AND fecha = ?';
    queryParams.push(fecha);
  }
  
  connection.query(query, queryParams, (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
};

const getRutaProgramada = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM ruta_programada WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Ruta no encontrada' });
    } else {
      res.json(results[0]);
    }
  });
};

const addRutaProgramada = (req, res) => {
  const { conductor_id, vehiculo_placa, fecha, ruta } = req.body;
  connection.query('INSERT INTO ruta_programada (conductor_id, vehiculo_placa, fecha, ruta) VALUES (?, ?, ?, ?)', [conductor_id, vehiculo_placa, fecha, ruta], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(201).json({ id: result.insertId, conductor_id, vehiculo_placa, fecha, ruta });
    }
  });
};

const updateRutaProgramada = (req, res) => {
  const { id } = req.params;
  const { conductor_id, vehiculo_placa, fecha, ruta } = req.body;
  connection.query('UPDATE ruta_programada SET conductor_id = ?, vehiculo_placa = ?, fecha = ?, ruta = ? WHERE id = ?', [conductor_id, vehiculo_placa, fecha, ruta, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Ruta no encontrada' });
    } else {
      res.json({ id, conductor_id, vehiculo_placa, fecha, ruta });
    }
  });
};

const deleteRutaProgramada = (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM ruta_programada WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Ruta no encontrada' });
    } else {
      res.status(204).send();
    }
  });
};

module.exports = { getRutasProgramadas, getRutaProgramada, addRutaProgramada, updateRutaProgramada, deleteRutaProgramada };
