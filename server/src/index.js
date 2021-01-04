const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const morgan = require('morgan');
const appRouter = require("./routes/router");

const app = express();

app.set('port',process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api', appRouter);

app.listen(app.get('port'), () => {
    console.log("Server Started on port", app.get('port'));
})
