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
    req.query.users = [ "5427a1171f84cf94157b834a" ];

    var itinerary = {
      title: req.query.title,
      days: []
    };

    var startDate = moment( req.query.startDate ),
        endDate   = moment( req.query.endDate );

    for( var curDate = moment( startDate.toDate() ); curDate <= endDate; curDate.add( 1, 'd' ) ) {

      sails.log.debug( "Creating date for ", curDate.format( "YYYY-MM-DD" ) );

      Day.create( {
        date: curDate.toDate(),

      } )
      .exec( function( err, date ) {
        if( err ) return res.serverError( err );

        itinerary.days.push( date.id );

        var aggregates = { };
        var thingsWeCareAbout = ["Movie", "Musician/band"];
        User.find(  )
            .populate( 'interests' )
            .exec( function( err, myUsrs ) {
              myUsrs.forEach( function( usr ) {
                thingsWeCareAbout.forEach( function( thing ) {
                  if( !aggregates.hasOwnProperty( thing ) )
                    aggregates[ thing ] = 0;

                  aggregates[ thing ] += usr.interests[0][ thing ] / myUsrs.length;
                } );
              } );

              // get Last.fm concert list
              LastFMService.getEventsAt("Ithaca,NY", function(err, concerts) {
                sails.log.debug(concerts);
                if(err) throw err;
                for( var i = 0; i < 10; ++i)
                {
                  if( i < aggregates["Movie"] / 10 )
                  {
                    // Movie
                    Event.create( {
                      title: "Movie",
                      day: date.id,
                      users: req.params.users,
                      type: 'custom'
                    } )
                    .exec( function( err, event ) {
                      if( err ) return res.serverError( err );
                    } );
                  }
                  else
                  {
                    // Concert
                    Event.create( {
                      title: concerts.events.event[i].title,
                      day: date.id,
                      users: req.params.users,
                      location: concerts.events.event[i].venue.location,
                      type: 'custom'
                    } )
                    .exec( function( err, event ) {
                      if( err ) return res.serverError( err );
                    } );
                  }
                }
              });
            });

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
      if( !itin ) return res.badRequest();

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
  },

  lastfm: function(req, res) {
    LastFMService.getEventsAt( "Ithaca,NY", function(err, loc) {
      if(err) return res.serverError(err);
      //console.log(loc);
      res.json(loc);
    } );
  }
};
