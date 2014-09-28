/**
 * ItineraryController
 *
 * @description :: Server-side logic for managing itineraries
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var moment = require( 'moment' );

module.exports = {
  create_basic: function( req, res ) {
    Day.create( {
      date: new Date()
    } ).exec( function( err, newDay ) {
      if( err ) return res.json( err );

      User.find().exec( function( err, users ) {
        Event.create( {
          day: newDay,
          title: "MY DOPE TITLE",
          users: users
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

            Itinerary.getUsers( newItin, function( err, users ) {
              if( err ) return res.serverError( err );

              res.json( newItin );
            } );
          } );
        } );
      } );
    } );
  },

  generate: function( req, res ) {
    // TODO: Remove me
    req.params.startDate = "2014-12-25";
    req.params.endDate = "2014-12-30";
    req.params.title = "DANK NUGGETS";
    req.params.users = [ "542714994f18ae5979f22b43" ];

    var itinerary = {
      title: req.params.title,
      days: []
    };

    var startDate = moment( req.params.startDate ),
        endDate   = moment( req.params.endDate );

    for( var curDate = moment( startDate.toDate() ); curDate <= endDate; curDate.add( 1, 'd' ) ) {

      Day.create( {
        date: curDate.toDate(),

      } )
      .exec( function( err, date ) {
        if( err ) return res.serverError( err );

        itinerary.days.push( date.id );

        //TODO: Generate events
        Event.create( {
          title: "BUTT-TASTROPHE",
          day: date.id,
          users: req.params.users,
          type: 'custom'
        } )
        .exec( function( err, event ) {
          if( err ) return res.serverError( err );
        } );

        if( itinerary.days.length == ( endDate.date() - startDate.date() ) ) {

          Itinerary
            .create( itinerary )
            .exec( function( err, itin ) {
              if( err ) return res.serverError( err );

              res.json( itin );
            } );
        }
      } );
    }
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
  },

  events: function( req, res ) {
    if( !req.params.id ) return res.badRequest();

    Itinerary.findOne( req.params.id ).exec( function( err, itin ) {
      if( err ) return res.serverError( err );

      Itinerary.getEvents( itin, function( err, events ) {
        if( err ) return res.serverError( err );

        res.json( events );
      } );
    } );
  },

  rhine: function( req, res ) {
    RhineService.getClosestItems( 'water', function( err, results ) {
      if( err ) return res.serverError( err );

      res.json( results );
    } );

    sails.log.debug( "Rhining..." );
  },

  fandango: function( req, res ) {
    FandangoService.callFandango( {}, sails.log.debug );
  },

  foursquare: function( req, res ) {
    FoursquareService.exploreVenues( {
      ll: "46,-70"
    }, function( err, venues ) {
      if( err ) return res.serverError( err );

      res.json( venues );
    } );
  }
};
