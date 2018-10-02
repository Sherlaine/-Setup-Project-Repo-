//they are modules that I need in this file
var secrets = require('./secrets');
var request = require('request');
var fs = require('fs');
var inputOne = process.argv[2];
var inputTwo = process.argv[3];

//introduction to our file
console.log('Welcome to the GitHub Avatar Downloader!');



//contacting the API and giving our authorization and token from the other files that we made 
function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request',
            'Authorization': 'token ' + secrets.GITHUB_TOKEN
        }
    };
//if the user does not put any inpit then you are left with an error
    if (inputOne === undefined || inputTwo === undefined) {
        console.log('Error in your arguments');
        return false;
    }
//this is requesting that we parse the body of the JSOn file 
    request(options, function (err, res, body) {
        var parsedBody = JSON.parse(body);
        parsedBody.forEach(function (element) {
            cb(err, element);
        });

    });
}

//download the images from the file path
function downloadImageByURL(url, filePath) {
    request(url).pipe(fs.createWriteStream(filePath));

}

//this is where we are calling the function for the user to put their inputs
getRepoContributors(inputOne, inputTwo, function (err, result) {
    var url = result.avatar_url;
    var filePath = "avatars/" + result.login + ".jpg";
    downloadImageByURL(url, filePath);

    // avatars/[login].jpg

});