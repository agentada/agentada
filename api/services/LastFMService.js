var apiKey = "cfe5e0da4e8630ccad727f6f193a6fcb";
var hostname = "ws.audioscrobbler.com";

module.exports = {
	getEventsAt: function ( location, cb) {

		var options = {
			hostname: hostname,
			port: 80,
			method: "GET",
			path: "/2.0?method=geo.getevents&location=" + location + "&api_key=" + apiKey + "&format=json"
		};

		RESTService.sendGetRequest(options, callback);
	}
};