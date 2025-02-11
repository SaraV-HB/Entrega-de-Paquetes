const conductoresModel = require('../models/conductorModel');

const getConductores = (req, res) => {
  conductoresModel.getConductores((err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
};

const getConductorById = (req, res) => {
  const { id } = req.params;
  conductoresModel.getConductorById(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!result) {
      res.status(404).json({ message: 'Conductor no encontrado' });
    } else {
      res.json(result);
    }
  });
};

const addConductor = (req, res) => {
  const conductor = req.body;
  conductoresModel.addConductor(conductor, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(201).json(result);
    }
  });
};

const updateConductor = (req, res) => {
  const { id } = req.params;
  const conductor = req.body;
  conductoresModel.updateConductor(id, conductor, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!result) {
      res.status(404).json({ message: 'Conductor no encontrado' });
    } else {
      res.json(result);
    }
  });
};

const deleteConductor = (req, res) => {
  const { id } = req.params;
  conductoresModel.deleteConductor(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!result) {
      res.status(404).json({ message: 'Conductor no encontrado' });
    } else {
      res.status(204).send();
    }
  });
};

module.exports = { getConductores, getConductorById, addConductor, updateConductor, deleteConductor };
