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
    },

    /**
     * Gets all users for the events for the day.
     */
    getUsers: function() {
      var users = [];
      for( var i in this.events ) {
        users.concat( this.events[ i ].users );
      }
      return users;
    }
  }
};
