const express = require("express") ;
const cors = require('cors');
const reserveRoutes = require("./routes/reserve") ; 
const redis = require("redis") ;
const AppError = require("./utils/appError") ;


const client = redis.createClient(6379) ; 
client.connect().catch(console.error);

const app = express() ; 
app.use(cors());
app.use(express.json()) ;
app.use('/api/v1/reserve', reserveRoutes) ; 
app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

client.on("error", (error) => {
    console.log(error);
})

client.on('connect', function() {
    console.log('Connected!');
  });

exports.expressApp = app; 
exports.client = client;
