function sha256Encode( stringToEncode ) {
    var crypto = require( 'crypto' );
    return crypto.createHash( 'sha256' ).update( stringToEncode ).digest( 'hex' );
}

function buildAuthorizationParameters( apiKey, sharedSecret ) {
    return 'apikey=' + apiKey + '&sig=' + sha256Encode( apiKey + sharedSecret + Math.floor( new Date() / 1000 ) );
}

function getResponseFromParameters( parameters, cb ) {

    var baseUri = 'http://api.fandango.com';

    // Use your account-specific values here
    var apiKey = '5gegsd3qkdt892qkqsk3kdxk';
    var sharedSecret = 'AR5bEZcJyD';

    var authorizationParameters = buildAuthorizationParameters( apiKey, sharedSecret );

    var requestUri = baseUri + '/v1/?' + parameters + '&' + authorizationParameters;

    var http = require( 'http' );

    http.get( requestUri, function( apiRes ) {
      var response = '';

      apiRes.on( 'data', function( data ) {
        response += data;
      });

      apiRes.on( 'end', function() {
        cb( null, response );
      } );
    } );
}

module.exports = {
  callFandango: function( options, cb ) {
    var zipCode = options.zipCode || '90064';
    var parameters = 'op=theatersbypostalcodesearch&postalcode=' + zipCode;

    getResponseFromParameters( parameters, cb );
  }
};
