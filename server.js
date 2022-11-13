// require express to server
const exprs = require('express');
//comment to app*********// Start up an instance of app
const app = exprs();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Initialize the main project folder
app.use(exprs.static('website'));


// Setup Server   //[test]
const hostingName = "127.0.0.1";
const port = 3000;

app.listen(port, () => {
    console.log(`Server running at http://${hostingName}:${port}/`);
});

// get request
app.get('/all', (req, res) => {
    res.send(projectData);
});
// post request
app.post("/sendData", (req, res) => {
    projectData = req.body;
    res.send({ massage: ' sending data success ' });
});
