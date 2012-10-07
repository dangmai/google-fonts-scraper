/*jslint node: true, nomen: true*/
/*global describe, it*/
'use strict';
var scrape = require("../index"),
	chai = require('chai'),
	_ = require('underscore'),
	assert = chai.assert,
	fontTypes = ["woff", "ttf", "eot"];

describe('google-fonts-scraper', function () {
	it('should return an array with different font types', function (done) {
		scrape("http://fonts.googleapis.com/css?family=Lobster")
			.then(function (fontUrls) {
				assert.typeOf(fontUrls, 'array');
				assert.lengthOf(fontUrls, 3);
				var fontFilter = _.filter(fontUrls, function (font) {
					var hasFontExtension = false;
					fontTypes.forEach(function (fontType) {
						hasFontExtension = hasFontExtension || font.indexOf(fontType) !== -1;
					});
					return hasFontExtension;
				});
				assert.lengthOf(fontFilter, 3);
				done();
			});
	});
});