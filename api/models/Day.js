/**
* Day.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    itinerary: {
      model: 'itinerary'
    },

    events: {
      collection: 'event',
      via: 'day'
    },

    date: {
      type: 'DATE',
      required: true
    },

    startTime: {
      type: 'DATETIME',
      required: false
    },

    endTime: {
      type: 'DATETIME',
      required: false
    },

    needHotel: {
      type: 'BOOLEAN',
      required: false,
      defaultsTo: false
    }
  }
};