module.exports = {
  apiGetter: function( controllerName, attrName ) {
    return function( req, res ) {
      if( !req.params.id ) return res.serverError.badRequest();

      global[ controllerName ]
        .findOne( req.params.id )
        .populate( attrName )
        .exec( function( err, inst )  {
          if( err ) return res.serverError( err );

          res.json( inst[ attrName ] );
        } );
    };
  }
};
