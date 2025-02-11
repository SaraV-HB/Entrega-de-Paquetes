const connection = require('../config/dbConfig');

const getRutasProgramadas = (filters, callback) => {
  const { vehiculo, conductor, fecha } = filters;
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
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getRutaProgramada = (id, callback) => {
  connection.query('SELECT * FROM ruta_programada WHERE id = ?', [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else if (results.length === 0) {
      callback(new Error('Ruta no encontrada'), null);
    } else {
      callback(null, results[0]);
    }
  });
};

const addRutaProgramada = (rutaProgramada, callback) => {
  const { conductor_id, vehiculo_placa, fecha, ruta } = rutaProgramada;
  connection.query('INSERT INTO ruta_programada (conductor_id, vehiculo_placa, fecha, ruta) VALUES (?, ?, ?, ?)', [conductor_id, vehiculo_placa, fecha, ruta], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { id: result.insertId, conductor_id, vehiculo_placa, fecha, ruta });
    }
  });
};

const updateRutaProgramada = (id, rutaProgramada, callback) => {
  const { conductor_id, vehiculo_placa, fecha, ruta } = rutaProgramada;
  connection.query('UPDATE ruta_programada SET conductor_id = ?, vehiculo_placa = ?, fecha = ?, ruta = ? WHERE id = ?', [conductor_id, vehiculo_placa, fecha, ruta, id], (err, result) => {
    if (err) {
      callback(err, null);
    } else if (result.affectedRows === 0) {
      callback(new Error('Ruta no encontrada'), null);
    } else {
      callback(null, { id, conductor_id, vehiculo_placa, fecha, ruta });
    }
  });
};

const deleteRutaProgramada = (id, callback) => {
  connection.query('DELETE FROM ruta_programada WHERE id = ?', [id], (err, result) => {
    if (err) {
      callback(err, null);
    } else if (result.affectedRows === 0) {
      callback(new Error('Ruta no encontrada'), null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = { getRutasProgramadas, getRutaProgramada, addRutaProgramada, updateRutaProgramada, deleteRutaProgramada };
