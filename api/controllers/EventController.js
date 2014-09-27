/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  users: function( req, res ) {
    if( !req.params.id ) return res.badRequest();

    Event.findOne( req.params.id ).exec( function( err, event ) {
      if( err ) return res.serverError( err );
      else return res.json( event.users );
    } );
  }
};
