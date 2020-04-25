const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const port = process.env.PORT || 3000

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('mysql rest api')
})

require("./routes/index.js")(app);

app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})