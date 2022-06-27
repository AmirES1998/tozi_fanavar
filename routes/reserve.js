const express = require("express");
// const { route } = require("../app");
const router = express.Router() ;
const reserveController = require("../controllers/reserveController") ;

router.get('/getCodes', reserveController.getCitiesCode) ; 
router.post('/flightList', reserveController.getFlightList) ;

module.exports = router ; 