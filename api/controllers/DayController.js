/**
 * DayController
 *
 * @description :: Server-side logic for managing days
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  users: function( req, res ) {
    if( !req.params.id ) return res.badRequest();

    Day.findOne( req.params.id ).exec( function( err, day ) {
      if( err ) return res.serverError( err );
      else return res.json( day.getUsers() );
    } );
  },

  events: function( req, res ) {
    ControllerHelpers.apiGetter( 'Day', 'events' )( req, res );
  }
};
