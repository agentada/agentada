/**
 * Event.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'STRING'
    },

    itinerary: {
      model: 'itinerary'
    },

    day: {
      model: 'day'
    },

    users: {
      collection: 'user'
    },

    startTime: {
      type: 'DATETIME'
    },

    endTime: {
      type: 'DATETIME'
    },

    location: {
      type: 'JSON'
    },

    type: {
      type: 'STRING',
      enum: [ 'custom', 'travel' ]
    }
  }
};
