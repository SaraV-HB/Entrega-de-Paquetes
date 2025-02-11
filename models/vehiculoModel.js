const connection = require('../config/dbConfig');

const getVehiculos = (callback) => {
  connection.query('SELECT * FROM vehiculo', (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getVehiculoByPlaca = (placa, callback) => {
  connection.query('SELECT * FROM vehiculo WHERE placa = ?', [placa], (err, results) => {
    if (err) {
      callback(err, null);
    } else if (results.length === 0) {
      callback(new Error('Vehículo no encontrado'), null);
    } else {
      callback(null, results[0]);
    }
  });
};

const addVehiculo = (vehiculo, callback) => {
  const { placa, modelo, color, marca, capacidad_carga } = vehiculo;
  connection.query(
    'INSERT INTO vehiculo (placa, modelo, color, marca, capacidad_carga) VALUES (?, ?, ?, ?, ?)',
    [placa, modelo, color, marca, capacidad_carga],
    (err, result) => {
      if (err) {
        console.error("Error al agregar el vehículo:", err); // Mensaje de error detallado
        callback(err, null);
      } else {
        callback(null, { placa, modelo, color, marca, capacidad_carga });
      }
    }
  );
};

const updateVehiculo = (placa, vehiculo, callback) => {
  const { modelo, color, marca, capacidad_carga } = vehiculo;
  connection.query(
    'UPDATE vehiculo SET modelo = ?, color = ?, marca = ?, capacidad_carga = ? WHERE placa = ?',
    [modelo, color, marca, capacidad_carga, placa],
    (err, result) => {
      if (err) {
        callback(err, null);
      } else if (result.affectedRows === 0) {
        callback(new Error('Vehículo no encontrado'), null);
      } else {
        callback(null, { placa, modelo, color, marca, capacidad_carga });
      }
    }
  );
};

const deleteVehiculo = (placa, callback) => {
  connection.query('DELETE FROM vehiculo WHERE placa = ?', [placa], (err, result) => {
    if (err) {
      callback(err, null);
    } else if (result.affectedRows === 0) {
      callback(new Error('Vehículo no encontrado'), null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = { getVehiculos, getVehiculoByPlaca, addVehiculo, updateVehiculo, deleteVehiculo };
