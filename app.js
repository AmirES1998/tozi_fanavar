const express = require("express") ;
const cors = require('cors');
const reserveRoutes = require("./routes/reserve") ; 


const app = express() ;
app.use(cors());
app.use(express.json()) ;

const AppError = require("./utils/appError") ;


app.use('/api/v1/reserve', reserveRoutes) ; 


app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

// app.use(require("body-parser").urlencoded({extended: false})); 

module.exports = app ; 