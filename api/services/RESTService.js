module.exports = {
  sendGetRequest: function( options, cb ) {
    var http;
    if (options.port === 80)
      http = require('http');
    else 
      http = require('https');

    http.request( options, function( response ) {
      sails.log.debug( "Sending request to " + options.host );

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
        sails.log.debug( "End request to " + options.host );
        try {
          // response available as `responseData` in `yourview`
          cb( null, JSON.parse( responseData ) );
        } catch ( err ) {

          if( options.host === "ws.audioscrobbler.com" )
          {
            return cb( null, responseData );
          } 
          else 
          {
            return cb( err, null ); 
          }
        }
      } );
    } ).end();
  }
};
