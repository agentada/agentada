/**
 * HomeController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  index: function(req, res) {
  	User.findOne( req.user.id )
  		.populate( 'interests' )
  		.exec( function( err, user ) {
  			if( err ) return res.serverError( err );

		    res.view({
		      user: user
		    });
  		} );
  }
};
