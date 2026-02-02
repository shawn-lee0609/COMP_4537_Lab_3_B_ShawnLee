// Brings the internal module from Node.js
// It provides the function to create a HTTP server
// and request/respond service
const http = require('http'); 

// Brings the internal module from Node.js
// Enables to parse the URL string to
// extract "path", "query param" etc.
const url = require('url');

// Brings the file "./modules/utils" from the same program
// It contains getDate()
const utils = require('./modules/utils');

const strings = require('./lang/en/user');

// Configure the port number where the server runs
const PORT = process.env.PORT || 3001; // If no environment var use default 3000

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); // Parses the request URL

    if(parsedUrl.pathname === '/COMP4537/labs/3/getDate/') {

        const name = parsedUrl.query.name || 'Guest'; // Gets the value of name from query parameter

        const currentDate = utils.getDate(); // Returns the current date and time of the server

        const msg = strings.greeting.replace('%1', name) + currentDate;

        res.writeHead(200, { 'Content-Type': 'text/html '}); // Writes the HTTP response header

        res.end(`<p style="color: blue;">${msg}</p>`); // After sending the body part, it ends the connection
    } 
    else { // If the route is not /COMP4537/labs/3/getDate/
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

