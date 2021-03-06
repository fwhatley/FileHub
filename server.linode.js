// Install express server - https://medium.com/@shubhsharma10/how-to-deploy-angular-6-app-to-heroku-52b73ac7a3aa
// This is a file for linode

const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files from the dist directory
var IndexFilePath_Prod = '/var/wwww/FileHub';
var IndexFilePath_Dev = __dirname + '/dist/FileHub';
var IndexFileFullPath_Prod = '/var/wwww/FileHub/index.html';
var IndexFileFullPath_Dev = __dirname + '/dist/FileHub/index.html';

app.use(express.static(IndexFilePath_Prod));

app.get('/*', function(req, res){
    res.sendFile(path.join(IndexFileFullPath_Prod));
});

// Start the app by listening on the default Heroku port
const port = 3001
var server = app.listen(process.env.PORT || port, function (){
    console.log("Listening on port %s...", server.address().port);
})
        