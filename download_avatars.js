var secrets = require ('./secrets');
var request = require('request');
console.log('Welcome to the GitHub Avatar Downloader!');



function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization':'token ' + secrets.GITHUB_TOKEN
      }
    };
  
    request(options, function(err, res, body) {
      var parsedBody = JSON.parse(body);
      parsedBody.forEach(function(element){
        cb(err,element);
      });
  
    });
  }


getRepoContributors("jquery", "jquery", function (err, result) {
    console.log(result.avatar_url);
    
});