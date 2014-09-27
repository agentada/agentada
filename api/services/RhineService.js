var apiKey = 'sdf0b913e4b07b5243b7f527';//process.env.API_KEY_RHINE;
var hostName = "api.rhine.io";

module.exports = {
  getClosestItems: function( item, cb ) {
    var http = require( 'http' );

    var options = {
      hostname: hostName,
      port: 80,
      method: 'GET',
      path: "/" + apiKey + "/closest_entities/" + item
    };

    http.request( options, function( response ) {
      sails.log.debug( "Sending request..." );

      var responseData = '';
      response.setEncoding( 'utf8' );

      response.on( 'data', function( chunk ) {
        responseData += chunk;
      });

      response.on( 'error', function( err ) {
        // Some error handling here, e.g.:
        cb( err, null );
      });

      response.on( 'end', function() {
        sails.log.debug( "End..." );
        try {
          // response available as `responseData` in `yourview`
          cb( null, JSON.parse( responseData ) );
        } catch ( err ) {
          return cb( err, null );
        }
      } );
    } ).end();
  }
};
