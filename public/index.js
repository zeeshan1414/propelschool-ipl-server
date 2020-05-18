const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send("I am a express server!")
});

app.get('/economy', (req, res) => {
    const year = req.query.year;
    const data = require('./data.json');
    res.send(data[year]);
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})