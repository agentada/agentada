module.exports = {

  generateInterestPercentages: function(userId, options, cb) {
    User.findOne({ uid: userId }).exec(function(err, user) 
    {
      if( options === null )
      {
        options = {
          totalLikes: 0,
          interestsAggregate: {},
          nextPage: "/v2.1/"+user.uid+"/likes?access_token="+user.fbToken
        }
      }

      var fbOpts = {
        host : "graph.facebook.com",
        port : 443,
        path : options.nextPage,
        method : 'GET' };

      sails.log.debug( options.totalLikes + " Likes grabbed." );

      RESTService.sendGetRequest( fbOpts, function(err, likes) 
      {
        if( !likes )
        {
          sails.log.debug( "Now we outta likes. Total: " + options.totalLikes );
          User.update(user.id, { interests: options.interestsAggregate, totalInterests: options.totalLikes }).exec(console.log);
          return false;
        }
        else
        {
          for( var i = 0; i < likes.data.length; i++ )
          {
            //sails.log.debug(likes.data[i].category);

            if(options.interestsAggregate[likes.data[i].category] === undefined)
              options.interestsAggregate[likes.data[i].category] = 0;

            options.interestsAggregate[likes.data[i].category] += 1;
            options.totalLikes++;
          }

          options.nextPage = likes.paging.next;
          UserInterests.generateInterestPercentages(user.uid, options, function() {});
        }
      });
    });
  }
}
