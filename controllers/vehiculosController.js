const connection = require('../config/dbConfig');

const getVehiculos = (req, res) => {
  connection.query('SELECT * FROM vehiculo', (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
};

const getVehiculoByPlaca = (req, res) => {
  const { placa } = req.params;
  connection.query('SELECT * FROM vehiculo WHERE placa = ?', [placa], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Vehículo no encontrado' });
    } else {
      res.json(results[0]);
    }
  });
};

const addVehiculo = (req, res) => {
  const { placa, modelo, color, marca, capacidad_carga } = req.body;
  connection.query('INSERT INTO vehiculo (placa, modelo, color, marca, capacidad_carga) VALUES (?, ?, ?, ?, ?)', [placa, modelo, color, marca, capacidad_carga], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(201).json({ placa, modelo, color, marca, capacidad_carga });
    }
  });
};

const updateVehiculo = (req, res) => {
  const { placa } = req.params;
  const { modelo, color, marca, capacidad_carga } = req.body;
  connection.query('UPDATE vehiculo SET modelo = ?, color = ?, marca = ?, capacidad_carga = ? WHERE placa = ?', [modelo, color, marca, capacidad_carga, placa], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Vehículo no encontrado' });
    } else {
      res.json({ placa, modelo, color, marca, capacidad_carga });
    }
  });
};

const deleteVehiculo = (req, res) => {
  const { placa } = req.params;
  connection.query('DELETE FROM vehiculo WHERE placa = ?', [placa], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Vehículo no encontrado' });
    } else {
      res.status(204).send();
    }
  });
};

module.exports = { getVehiculos, getVehiculoByPlaca, addVehiculo, updateVehiculo, deleteVehiculo };
