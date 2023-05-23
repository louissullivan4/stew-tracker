const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3001;
const db = require('./dbquery')
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.send('Hello from steW food tracker!')
});

app.get('/food/:foodName', db.getFoodByName)

app.get('/foodlike/:foodName', db.getFoodLikeName)

app.post('/createfood/', db.createFood)

app.put('/updatefoodname/:foodName', db.updateFoodByName)


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
