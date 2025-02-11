const connection = require('../config/dbConfig');

const getDetalleRutas = (callback) => {
  connection.query('SELECT * FROM detalle_ruta', (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getDetalleRuta = (id, callback) => {
  connection.query('SELECT * FROM detalle_ruta WHERE id = ?', [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else if (results.length === 0) {
      callback(new Error('Detalle de Ruta no encontrado'), null);
    } else {
      callback(null, results[0]);
    }
  });
};

const addDetalleRuta = (detalleRuta, callback) => {
  const { ruta_id, latitud, longitud, direccion, numero_paquete } = detalleRuta;
  connection.query('INSERT INTO detalle_ruta (ruta_id, latitud, longitud, direccion, numero_paquete) VALUES (?, ?, ?, ?, ?)', [ruta_id, latitud, longitud, direccion, numero_paquete], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { id: result.insertId, ruta_id, latitud, longitud, direccion, numero_paquete });
    }
  });
};

const updateDetalleRuta = (id, detalleRuta, callback) => {
  const { ruta_id, latitud, longitud, direccion, numero_paquete } = detalleRuta;
  connection.query('UPDATE detalle_ruta SET ruta_id = ?, latitud = ?, longitud = ?, direccion = ?, numero_paquete = ? WHERE id = ?', [ruta_id, latitud, longitud, direccion, numero_paquete, id], (err, result) => {
    if (err) {
      callback(err, null);
    } else if (result.affectedRows === 0) {
      callback(new Error('Detalle de Ruta no encontrado'), null);
    } else {
      callback(null, { id, ruta_id, latitud, longitud, direccion, numero_paquete });
    }
  });
};

const deleteDetalleRuta = (id, callback) => {
  connection.query('DELETE FROM detalle_ruta WHERE id = ?', [id], (err, result) => {
    if (err) {
      callback(err, null);
    } else if (result.affectedRows === 0) {
      callback(new Error('Detalle de Ruta no encontrado'), null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = { getDetalleRutas, getDetalleRuta, addDetalleRuta, updateDetalleRuta, deleteDetalleRuta };
