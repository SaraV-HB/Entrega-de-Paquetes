const connection = require('../config/dbConfig');

const getDetalleRutas = (req, res) => {
  connection.query('SELECT * FROM detalle_ruta', (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
};

const getDetalleRuta = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM detalle_ruta WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Detalle de Ruta no encontrado' });
    } else {
      res.json(results[0]);
    }
  });
};

const addDetalleRuta = (req, res) => {
  const { ruta_id, latitud, longitud, direccion, numero_paquete } = req.body;
  connection.query('INSERT INTO detalle_ruta (ruta_id, latitud, longitud, direccion, numero_paquete) VALUES (?, ?, ?, ?, ?)', [ruta_id, latitud, longitud, direccion, numero_paquete], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(201).json({ id: result.insertId, ruta_id, latitud, longitud, direccion, numero_paquete });
    }
  });
};

const updateDetalleRuta = (req, res) => {
  const { id } = req.params;
  const { ruta_id, latitud, longitud, direccion, numero_paquete } = req.body;
  connection.query('UPDATE detalle_ruta SET ruta_id = ?, latitud = ?, longitud = ?, direccion = ?, numero_paquete = ? WHERE id = ?', [ruta_id, latitud, longitud, direccion, numero_paquete, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Detalle de Ruta no encontrado' });
    } else {
      res.json({ id, ruta_id, latitud, longitud, direccion, numero_paquete });
    }
  });
};

const deleteDetalleRuta = (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM detalle_ruta WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Detalle de Ruta no encontrado' });
    } else {
      res.status(204).send();
    }
  });
};

module.exports = { getDetalleRutas, getDetalleRuta, addDetalleRuta, updateDetalleRuta, deleteDetalleRuta };
