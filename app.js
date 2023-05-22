const express = require('express');
const app = express();
const port = 3000;

const db = require('./dbquery')


app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.get('/food/:foodName', db.getFoodByName)

app.get('/foodlike/:foodName', db.getFoodLikeName)



app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
