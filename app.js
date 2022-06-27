const express = require("express") ;
const reserveRoutes = require("./routes/reserve") ; 


const app = express() ;
const AppError = require("./utils/appError") ;


app.use('/api/v1/reserve', reserveRoutes) ; 


app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

module.exports = app ; 