/**
 * PastelController
 *
 * @description :: Server-side logic for managing Pastels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  CrearPastel: function (req, res) {
    var parametros = req.allParams();
    if (parametros.nombre && parametros.tiempoElaboracion && parametros.urlFoto && parametros.idPasteleria) {

      Pastel.create(parametros).exec(function (err, pastelCreado) {
        if (err) {
          return res.view('vistas/error', {
            error: {
              descripcion: "Fallo al crear el Pastel",
              rawError: err,
              url: "/ListarPasteles?id="+ parametros.idPasteleria
            }
          });
        }

        Pasteleria.findOne({
          id: parametros.idPasteleria
        }).populate('pasteles').exec(function (err, pasteleriaEncontrada) {
          if (err) {
            return res.view('vistas/error', {
              error: {
                descripcion: "Hubo un problema cargando los pasteles",
                rawError: err,
                url: "/ListarPasteles?id="+ parametros.idPasteleria
              }
            });
          } else {
            return res.view('vistas/pastel/listarPasteles', {
              pasteleria: pasteleriaEncontrada
            });
          }
        });
      });
    } else {
      return res.view('vistas/error', {
        error: {
          descripcion: "No se completaron todos los campos",
          rawError: "Campos Incompletos",
          url: "/ListarPasteles?id="+ parametros.idPasteleria
        }
      });
    }
  }
};

