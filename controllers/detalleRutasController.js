const detalleRutasModel = require('../models/detalleRutaModel');

const getDetalleRutas = (req, res) => {
  detalleRutasModel.getDetalleRutas((err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
};

const getDetalleRuta = (req, res) => {
  const { id } = req.params;
  detalleRutasModel.getDetalleRuta(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!result) {
      res.status(404).json({ message: 'Detalle de Ruta no encontrado' });
    } else {
      res.json(result);
    }
  });
};

const addDetalleRuta = (req, res) => {
  const detalleRuta = req.body;
  detalleRutasModel.addDetalleRuta(detalleRuta, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(201).json(result);
    }
  });
};

const updateDetalleRuta = (req, res) => {
  const { id } = req.params;
  const detalleRuta = req.body;
  detalleRutasModel.updateDetalleRuta(id, detalleRuta, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!result) {
      res.status(404).json({ message: 'Detalle de Ruta no encontrado' });
    } else {
      res.json(result);
    }
  });
};

const deleteDetalleRuta = (req, res) => {
  const { id } = req.params;
  detalleRutasModel.deleteDetalleRuta(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!result) {
      res.status(404).json({ message: 'Detalle de Ruta no encontrado' });
    } else {
      res.status(204).send();
    }
  });
};

module.exports = { getDetalleRutas, getDetalleRuta, addDetalleRuta, updateDetalleRuta, deleteDetalleRuta };
