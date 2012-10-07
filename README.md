#About
Google Fonts Scraper is a [Node](http://nodejs.org) module to scrape Google fonts' CSS files and get the fonts' true URLs. Usually, Google determines the fonts the client needs dynamically, so it's hard to get the URLs for all the font types. I use it mainly for AppCache-enabled projects, but it may be useful for other purposes as well.

This project adapts code from http://tensquirrel.blogspot.com/2010/10/locally-caching-google-web-fonts.html

#Usage
The library returns a [q](https://github.com/kriskowal/q) promise:
```javascript
var scrape = require("google-fonts-scraper");
scrape("http://fonts.googleapis.com/css?family=Lobster")
	.then(function (fontUrls) {
		// fontUrls is an array of all the font files for the Lobster font.
	}, function (error) {
		// handle errors here
	});
```

#Tests
To run tests:
`npm test`