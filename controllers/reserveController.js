const AppError = require("../utils/appError") ;
const axios = require("axios").default ;
const app = require("../app")
const actions = require("../db/databaseAction");


const config = {
    headers:{
        "Cache-Control": "no-cache",
        "Accept" : "*/*",
        "Accept-Encoding" : "gzip, deflate, br",
        "Connection" : "keep-alive"

    }
  };



  var locations = [] ; 

exports.getCitiesCode =   async (req, res) => { 
try{
    const url = "https://respina24.ir/flight/Locations1" ;
    console.log("getCodes req recieved");
    const df = await axios.get(url) ;

    for(var i = 0 ; i < df.data['Locations'].length; i++ ) {
        let tmp = {
            "iata" : df.data['Locations'][i].iata ,
                "perisanName" : df.data['Locations'][i].persianname
        }
        locations.push(tmp) ;
    }
    res.send(locations) ;
}
catch(error) {
    console.log(error); 
    res.status(500).json(error);

}

}


exports.getFlightList = async (req, res) => { 
try {

    
    const body = req.body ;
    console.log("getFlightList req recieved");
    const url = "https://respina24.ir/flight/Availability" ;
    let response; 
    let cachedBody =await actions.getCachedBody('body')
        .then(function(data) {return data;})
        .catch(err => console.log(err)) ;

    

    
    if(JSON.stringify(body) === JSON.stringify(cachedBody)) { 
        response = await actions.getCachedFlightList();
        console.log("res as cached Data");
       
    }
    else { 
        actions.addObject("body", body);
        const data = await axios.post(url, body) ;
        response = data.data["list"] ;
        actions.addFlightList("Flights", response) ; 
        console.log("res as api fetch Data");
        
    }

    res.send(response);

}
catch(err) {
console.log(err);
}



}