/**
 * Pastel.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre: {
      type: 'string',
      required: true
    },
    tiempoElaboracion: {
      type: 'integer',
      required: true
    },
    urlFoto: {
      type: 'string',
      required: true
    },
    idPasteleria: {
      model: 'Pasteleria',
      required: true
    }
  }
};

