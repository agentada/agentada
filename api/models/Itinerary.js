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
    }
  },

  /**
   * Gets all users for the events for the itinerary.
   */
  getUsers: function( itn, cb ) {
    var users = {};

    function unique( arr ) {
      var found = [];
      var vals = [];
      for( var key in arr ) {
        if( found.lastIndexOf( key ) === -1 ) {
          found.push( key );
          vals.push( arr[ key ] );
        }
      }

      return vals;
    }

    Itinerary.getEvents( itn, function( err, eventObjs, events ) {
      // Iterate over all events in the itinerary
      Event.find( { id: events } )
        .populate( 'users' )
        .exec( function( err, events ) {
        if( err ) cb( err, null );

        // For each event, add it's users
        events.forEach( function( event, i ) {
          event.users.forEach( function( user, j ) {
            users[ user.id ] = user;
          } );
        } );

        // Send users back to caller
        cb( null, unique( users ) );
      } );
    } );
  },

  getEvents: function( itn, cb ) {
    var events = [];
    var eventIds = [];

    Itinerary.findOne( itn.id )
      .exec( function( err, itin ) {
        if( err ) return cb( err, null );

        Day.find( itin.days )
          .populate( 'events' )
          .exec( function( err, days ) {
            if( err ) return cb( err, null );

            days.forEach( function( day ) {
              day.events.forEach( function( event ) {
                events.push( event );
                eventIds.push( event.id );
              } );
            } );

            cb( null, events, eventIds );
          } );
      } );

    //cb( null, events );
  }
};
