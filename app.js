const express = require("express") ;
const cors = require('cors');
const reserveRoutes = require("./routes/reserve") ; 
const redis = require("redis") ;
// const client = require("./db/redis")


const client = redis.createClient(6379) ; 
const app = express() ; 
app.use(cors());
app.use(express.json()) ;

const AppError = require("./utils/appError") ;


app.use('/api/v1/reserve', reserveRoutes) ; 


app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

client.on("error", (error) => {
    console.log(error);
})

client.on("connect", (msg) => {
    console.log("redis connected suucessful");
}) ;



// app.use(require("body-parser").urlencoded({extended: false})); 

module.exports = app ; 
