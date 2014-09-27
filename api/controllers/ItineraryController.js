/**
 * ItineraryController
 *
 * @description :: Server-side logic for managing itineraries
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create_basic: function( req, res ) {
    Day.create( {
      date: new Date()
    } ).exec( function( err, newDay ) {
      if( err ) return res.json( err );

      Event.create( {
        day: newDay,
        title: "MY DOPE TITLE",
        users: [ '54263706144869e62c50d5fb' ]
      } ).exec( function( err, newEvent ) {
        if( err ) return res.json( err );

        Day.update( newDay.id, { events: [ newEvent ] } );

        Itinerary.create( {
          title: "TEST ITINERARY",
          days: [ newDay.id ],
          events: [ newEvent.id ]
        } ).exec( function( err, newItin ) {
          if( err ) return res.json( err );

          Event.update( newEvent.id, { itinerary: newItin } );

          res.json( {
            users: newItin.getUsers(),
            events: newItin.events
          } );
        } );
      } );
    } );
  },

  users: function( req, res ) {
    if( !req.params.id ) return res.badRequest();

    Itinerary.findOne( req.params.id ).exec( function( err, itin ) {
      if( err ) return res.serverError( err );

      Itinerary.getUsers( itin, function( err, users ) {
        if( err ) return res.serverError( err );

        res.json( users );
      } );
    } );
  }
};
