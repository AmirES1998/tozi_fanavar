const express = require("express");
const router = express.Router() ;
const reserveController = require("../controllers/reserveController") ;

router.get('/getCodes', reserveController.getCitiesCode) ; 

module.exports = router ; 