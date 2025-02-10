const db = require('../config/dbConfig');

exports.obtenerPuntosPorRuta = (rutaId, callback) => {
    const sql = `SELECT latitud, longitud, direccion FROM detalle_ruta WHERE ruta_id = ?`;
    db.query(sql, [rutaId], (err, resultados) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, resultados);
        }
    });
};