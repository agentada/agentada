/**
 * HomeController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  index: function(req, res) {
    res.view({
  		username: req.user
    });
  },

  createitinerary: function(req, res) {
  	res.view();
  }
};
