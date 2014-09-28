var hostname = "www.priceline.com";

module.exports = {
	getHotelsAt: function (location, checkindate, checkoutdate, numRooms, cb) {

		var options = {
			host: hostName,
			port: 80,
			method: "GET",
			path: "/api/hotelretail/listing/v3/" + location + "/" + checkindate + "/" + checkoutdate + "/" + numRooms + "/10?offset=0"
		};

		RESTService.sendGetRequest(options, cb);
	}
};