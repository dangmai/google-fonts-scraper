/*jslint node: true, nomen: true*/
'use strict';

var request = require('request'),
	_ = require('underscore'),
	Q = require('q'),
	agents = [
		'Mozilla/5.0 (X11; Linux i686; rv:6.0) Gecko/20100101 Firefox/6.0',
		'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
		'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 7.1; Trident/5.0)'
	],
	url = 'http://fonts.googleapis.com/css?family=Lobster|Cabin';

function scrape(cssUrl) {
	var deferred = Q.defer(),
		fontUrls = [],
		doneCount = 0;
	console.log("function called");
	agents.forEach(function (agent) {
		request({
			url: cssUrl,
			headers: {
				"User-Agent": agent
			}
		}, function (error, response, body) {
			doneCount += 1;
			if (error) {
				deferred.reject(new Error(error));
			} else if (response.statusCode !== 200) {
				deferred.reject(new Error("Server returns status code " + response.statusCode));
			} else {
				fontUrls = fontUrls.concat(body.match(/http:\/\/[a-zA-Z0-9\/._\-]+/g));
			}
			if (doneCount === agents.length) {
				console.log("Done");
				fontUrls = _.uniq(fontUrls);
				deferred.resolve(fontUrls);
			}
		});
	});
	return deferred.promise;
}

module.exports = scrape;