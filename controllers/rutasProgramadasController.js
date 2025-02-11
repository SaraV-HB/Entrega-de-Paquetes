const rutasProgramadasModel = require('../models/rutaProgramadaModel');

const getRutasProgramadas = (req, res) => {
  const filters = req.query;
  rutasProgramadasModel.getRutasProgramadas(filters, (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
};

const getRutaProgramada = (req, res) => {
  const { id } = req.params;
  rutasProgramadasModel.getRutaProgramada(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!result) {
      res.status(404).json({ message: 'Ruta no encontrada' });
    } else {
      res.json(result);
    }
  });
};

const addRutaProgramada = (req, res) => {
  const rutaProgramada = req.body;
  rutasProgramadasModel.addRutaProgramada(rutaProgramada, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(201).json(result);
    }
  });
};

const updateRutaProgramada = (req, res) => {
  const { id } = req.params;
  const rutaProgramada = req.body;
  rutasProgramadasModel.updateRutaProgramada(id, rutaProgramada, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!result) {
      res.status(404).json({ message: 'Ruta no encontrada' });
    } else {
      res.json(result);
    }
  });
};

const deleteRutaProgramada = (req, res) => {
  const { id } = req.params;
  rutasProgramadasModel.deleteRutaProgramada(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!result) {
      res.status(404).json({ message: 'Ruta no encontrada' });
    } else {
      res.status(204).send();
    }
  });
};

module.exports = { getRutasProgramadas, getRutaProgramada, addRutaProgramada, updateRutaProgramada, deleteRutaProgramada };
