/**
 * PasteleriaController
 *
 * @description :: Server-side logic for managing Pastelerias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  CrearPasteleria: function (req, res) {
    var parametros = req.allParams();
    if (parametros.nombre && parametros.ciudad && parametros.correo) {

      Pasteleria.create(parametros).exec(function (err, pasteleriaCreada) {
        if (err) {
          return res.view('vistas/error', {
            error: {
              descripcion: "Fallo al crear la Pastelería",
              rawError: err,
              url: "/CrearPastelería"
            }
          });
        }

        Pasteleria.find().exec(function (err, pasteleriasEncontradas) {
          if (err) {
            return res.view('vistas/error', {
              error: {
                descripcion: "Hubo un problema cargando las Pastelerías",
                rawError: err,
                url: "/ListarPastelerias"
              }
            });
          } else {
            return res.view('vistas/pasteleria/listarPastelerias', {
              pastelerias: pasteleriasEncontradas
            });
          }
        });
      });
    } else {
      return res.view('vistas/error', {
        error: {
          descripcion: "No se completaron todos los campos",
          rawError: "Campos Incompletos",
          url: "/CrearPastelerias"
        }
      });
    }
  },

  BorrarPasteleria: function (req, res) {
    var parametros = req.allParams();

    if (parametros.id) {
      Pasteleria.destroy({
        id: parametros.id
      }).exec(function (err, pasteleriaEliminada) {
        if (err) {
          return res.view('vistas/error', {
            error: {
              descripcion: "Hubo un problema al eliminar la pasteleria",
              rawError: err,
              url: "/ListarPastelerias"
            }
          });
        }

        Pasteleria.find().exec(function (err, pasteleriasEncontradas) {
          if (err) {
            return res.view('vistas/error', {
              error: {
                descripcion: "Hubo un problema cargando las Pastelerías",
                rawError: err,
                url: "/ListarPastelerias"
              }
            });
          } else {
            return res.view('vistas/pasteleria/listarPastelerias', {
              pastelerias: pasteleriasEncontradas
            });
          }
        });
      });
    } else {
      return res.view('vistas/error', {
        error: {
          descripcion: "Necesitamos el ID para borrar la pasteleria",
          rawError: "Falta ID",
          url: "/ListarPastelerias"
        }
      })
    }
  },

  EditarPasteleria: function (req, res) {
    var parametros = req.allParams();

    if (parametros.id && parametros.nombre || parametros.ciudad || parametros.correo) {

      var pasteleriaEditar = {
        nombre: parametros.nombre,
        ciudad: parametros.ciudad,
        correo: parametros.correo
      };

      if (pasteleriaEditar.nombre == '') {
        delete pasteleriaEditar.nombre;
      }

      if (pasteleriaEditar.ciudad == '') {
        delete pasteleriaEditar.ciudad;
      }

      if (pasteleriaEditar.correo == '') {
        delete pasteleriaEditar.correo;
      }

      Pasteleria.update({
        id: parametros.id
      }, pasteleriaEditar).exec(function (err, pasteleriaEditada) {
        if (err) {
          return res.view('vistas/error', {
            error: {
              descripcion: "Hubo un problema al editar la pastelería",
              rawError: err,
              url: "/ListarPastelerias"
            }
          });
        }
        Pasteleria.find().exec(function (err, pasteleriasEncontradas) {
          if (err) {
            return res.view('vistas/error', {
              error: {
                descripcion: "Hubo un problema cargando las Pastelerías",
                rawError: err,
                url: "/ListarPastelerias"
              }
            });
          } else {
            return res.view('vistas/pasteleria/listarPastelerias', {
              pastelerias: pasteleriasEncontradas
            });
          }
        });
      });
    } else {
      return res.view('vistas/error', {
        error: {
          descripcion: "Necesitamos el ID y al menos un campo para editar la pasteleria",
          rawError: "No envía todos los campos",
          url: "/ListarPastelerias"
        }
      })
    }
  }
};

