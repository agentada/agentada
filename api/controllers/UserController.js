/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	current: function(req, res) {
		if(req.user)
			res.json(req.user);
		else
			res.badRequest();
	}
};

