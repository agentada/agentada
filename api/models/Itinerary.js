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
  },

  /**
   * Gets all users for the events for the itinerary.
   */
  getUsers: function( itn, cb ) {
    var users = [];

    // Iterate over all events in the itinerary
    Event.find( { id: itn.events } )
        .populate( 'users' )
        .exec( function( err, events ) {
      if( err ) cb( err, null );

      // For each event, add it's users
      events.forEach( function( event, i ) {
        event.users.forEach( function( user, j ) {
          users.push( user );
        } );
      } );

      // Send users back to caller
      cb( null, users );
    } );
  }
};
