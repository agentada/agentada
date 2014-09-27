/**
 * Itinerary.js
 *
 * @description :: Represents an itinerary for an entire trip.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'STRING',
      required: true
    },

    days: {
      collection: 'day',
      via: 'itinerary'
    },

    events: {
      collection: 'event',
      via: 'itinerary'
    },

    /**
     * Gets all users for the events for the itinerary.
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
