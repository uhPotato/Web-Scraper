// rquire cheerio that is the scraper package
var cheerio = require('cheerio');

// require request which gets the html
var request = require('request');

// pull in the article model
var Article = require('../models/Article');

// define the site we want to scrape
var website = 'http://tappedout.net/';

function scrapeIt(callback) {

	// get the HTML
	request(website, function(error, response, body) {

		// see if there was an error
		if (error) console.log("scraping error", error);

		// save the html
		var $ = cheerio.load(body)

		// now scrape scrape scrape!
		$('div.name').each(function(i, element) {

			// title is the .text within this
			var title = $(this).text().trim();

			// link is the href on a child element
			var link = $(element).children().attr("href");

			// build the freshArticle object that we will save to db
			var freshArticle = new Article({
				title: title,
				link: link
			});

			// save the Article
			freshArticle.save(function(error) {
				if (error) console.log("couldn't save article!", error);
			}); // end of save function

		}); // end of .each function

		callback();
		
	}); // end of request function

} // end of scrapeIt function

// export the scraping
exports.scrapeIt = scrapeIt;