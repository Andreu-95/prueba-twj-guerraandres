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
              url: "/ListarPasteles?id=" + parametros.idPasteleria
            }
          });
        }

        if (parametros.idPasteleria) {
          Pasteleria.findOne({
            id: parametros.idPasteleria
          }).populate('pasteles').exec(function (err, pasteleriaEncontrada) {
            if (err) {
              return res.view('vistas/error', {
                error: {
                  descripcion: "Hubo un problema cargando los pasteles",
                  rawError: err,
                  url: "/ListarPasteles?id=" + parametros.idPasteleria
                }
              });
            } else {
              return res.view('vistas/pastel/listarPasteles', {
                pasteleria: pasteleriaEncontrada
              });
            }
          });
        } else {
          return res.view('vistas/error', {
            error: {
              descripcion: "No ha enviado el parámetro ID",
              rawError: "Faltan Parámetros",
              url: "/ListarPastelerias"
            }
          });
        }
      });
    } else {
      return res.view('vistas/error', {
        error: {
          descripcion: "No se completaron todos los campos",
          rawError: "Campos Incompletos",
          url: "/ListarPasteles?id=" + parametros.idPasteleria
        }
      });
    }
  },

  BorrarPastel: function (req, res) {
    var parametros = req.allParams();

    if (parametros.id) {
      Pastel.destroy({
        id: parametros.id
      }).exec(function (err, pastelEliminado) {
        if (err) {
          return res.view('vistas/error', {
            error: {
              descripcion: "Hubo un problema al eliminar el pastel",
              rawError: err,
              url: "/ListarPasteles?id=" + parametros.idPasteleria
            }
          });
        }

        if (parametros.idPasteleria) {
          Pasteleria.findOne({
            id: parametros.idPasteleria
          }).populate('pasteles').exec(function (err, pasteleriaEncontrada) {
            if (err) {
              return res.view('vistas/error', {
                error: {
                  descripcion: "Hubo un problema cargando los pasteles",
                  rawError: err,
                  url: "/ListarPasteles?id=" + parametros.idPasteleria
                }
              });
            } else {
              return res.view('vistas/pastel/listarPasteles', {
                pasteleria: pasteleriaEncontrada
              });
            }
          });
        } else {
          return res.view('vistas/error', {
            error: {
              descripcion: "No ha enviado el parámetro ID",
              rawError: "Faltan Parámetros",
              url: "/ListarPastelerias"
            }
          });
        }
      });
    } else {
      return res.view('vistas/error', {
        error: {
          descripcion: "Necesitamos el ID para borrar el pastel",
          rawError: "Falta ID",
          url: "/ListarPasteles?id=" + parametros.idPasteleria
        }
      })
    }
  },

  EditarPastel: function (req, res) {
    var parametros = req.allParams();

    if (parametros.id && parametros.nombre || parametros.tiempoElaboracion || parametros.urlFoto) {

      var pastelEditar = {
        nombre: parametros.nombre,
        tiempoElaboracion: parametros.tiempoElaboracion,
        urlFoto: parametros.urlFoto
      };

      if (pastelEditar.nombre == '') {
        delete pastelEditar.nombre;
      }

      if (pastelEditar.tiempoElaboracion == '') {
        delete pastelEditar.tiempoElaboracion;
      }

      if (pastelEditar.urlFoto == '') {
        delete pastelEditar.urlFoto;
      }

      Pastel.update({
        id: parametros.id
      }, pastelEditar).exec(function (err, pastelEditado) {
        if (err) {
          return res.view('vistas/error', {
            error: {
              descripcion: "Hubo un problema al editar el pastel",
              rawError: err,
              url: "/ListarPasteles?id=" + parametros.idPasteleria
            }
          });
        }

        if (parametros.idPasteleria) {
          Pasteleria.findOne({
            id: parametros.idPasteleria
          }).populate('pasteles').exec(function (err, pasteleriaEncontrada) {
            if (err) {
              return res.view('vistas/error', {
                error: {
                  descripcion: "Hubo un problema cargando los pasteles",
                  rawError: err,
                  url: "/ListarPasteles?id=" + parametros.idPasteleria
                }
              });
            } else {
              return res.view('vistas/pastel/listarPasteles', {
                pasteleria: pasteleriaEncontrada
              });
            }
          });
        } else {
          return res.view('vistas/error', {
            error: {
              descripcion: "No ha enviado el parámetro ID",
              rawError: "Faltan Parámetros",
              url: "/ListarPastelerias"
            }
          });
        }
      });
    } else {
      return res.view('vistas/error', {
        error: {
          descripcion: "Necesitamos el ID y al menos un campo para editar el pastel",
          rawError: "No envía todos los campos",
          url: "/ListarPasteles?id=" + parametros.idPasteleria
        }
      })
    }
  }
};

