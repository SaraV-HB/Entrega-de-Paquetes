const vehiculosModel = require('../models/vehiculoModel');

const getVehiculos = (req, res) => {
  vehiculosModel.getVehiculos((err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
};

const getVehiculoByPlaca = (req, res) => {
  const { placa } = req.params;
  vehiculosModel.getVehiculoByPlaca(placa, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!result) {
      res.status(404).json({ message: 'Vehículo no encontrado' });
    } else {
      res.json(result);
    }
  });
};

const addVehiculo = (req, res) => {
  const vehiculo = req.body;
  vehiculosModel.addVehiculo(vehiculo, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(201).json(result);
    }
  });
};

const updateVehiculo = (req, res) => {
  const { placa } = req.params;
  const vehiculo = req.body;
  vehiculosModel.updateVehiculo(placa, vehiculo, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!result) {
      res.status(404).json({ message: 'Vehículo no encontrado' });
    } else {
      res.json(result);
    }
  });
};

const deleteVehiculo = (req, res) => {
  const { placa } = req.params;
  vehiculosModel.deleteVehiculo(placa, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!result) {
      res.status(404).json({ message: 'Vehículo no encontrado' });
    } else {
      res.status(204).send();
    }
  });
};

module.exports = { getVehiculos, getVehiculoByPlaca, addVehiculo, updateVehiculo, deleteVehiculo };
