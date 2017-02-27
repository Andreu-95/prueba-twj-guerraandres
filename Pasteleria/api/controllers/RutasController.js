/**
 * RutasController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  Home: function (req, res) {
    return res.view('vistas/inicio');
  },

  CrearPasteleria: function (req, res) {
    return res.view('vistas/pasteleria/crearPasteleria');
  },

  ListarPastelerias: function (req, res) {
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
  },

  EditarPasteleria: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Pasteleria.findOne({
        id: parametros.id
      }).exec(function (err, pasteleriaEncontrada) {
        if (err) {
          return res.view('vistas/error', {
            error: {
              descripcion: "Error Inesperado",
              rawError: err,
              url: "/ListarPastelerias"
            }
          });
        }

        if (pasteleriaEncontrada) {
          return res.view('vistas/pasteleria/editarPasteleria', {
            pasteleriaAEditar: pasteleriaEncontrada
          });
        } else {
          return res.view('vistas/error', {
            error: {
              descripcion: "No se encontró la pastelería con el id: " + parametros.id,
              rawError: "Pastelería No Encontrada",
              url: "/ListarPastelerias"
            }
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
  },

  CrearPastel: function (req, res) {
    var parametros = req.allParams();
    return res.view('vistas/pastel/crearPastel', {
      pasteleria: parametros
    });
  },

  ListarPasteles: function (req, res) {
    var parametros = req.allParams();

    if (parametros.id) {
      Pasteleria.findOne({
        id: parametros.id
      }).populate('pasteles').exec(function (err, pasteleriaEncontrada) {
        if (err) {
          return res.view('vistas/error', {
            error: {
              descripcion: "Hubo un problema cargando los pasteles",
              rawError: err,
              url: "/ListarPasteles?id=" + parametros.id
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
  },

  EditarPastel: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Pastel.findOne({
        id: parametros.id
      }).exec(function (err, pastelEncontrado) {
        if (err) {
          return res.view('vistas/error', {
            error: {
              descripcion: "Error Inesperado",
              rawError: err,
              url: "/ListarPasteles?id=" + parametros.idPasteleria
            }
          });
        }

        if (pastelEncontrado) {
          return res.view('vistas/pastel/editarPastel', {
            pastelAEditar: pastelEncontrado
          });
        } else {
          return res.view('vistas/error', {
            error: {
              descripcion: "No se encontró el pastel con el id: " + parametros.id,
              rawError: "Pastel No Encontrado",
              url: "/ListarPasteles?id=" + parametros.idPasteleria
            }
          });
        }
      });
    } else {
      return res.view('vistas/error', {
        error: {
          descripcion: "No ha enviado el parámetro ID",
          rawError: "Faltan Parámetros",
          url: "/ListarPasteles?id=" + parametros.idPasteleria
        }
      });
    }
  }
};

