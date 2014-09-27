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
    }
  }
};
