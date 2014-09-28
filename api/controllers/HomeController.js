/**
 * HomeController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  index: function(req, res) {
    res.view({
    	isauth: req.isAuthenticated(),
      user: req.user,
  		username: req.user
    });
  },

  createitinerary: function(req, res) {
  	res.view({
  		isauth: req.isAuthenticated(),
      user: req.user
  	});
  }
};
