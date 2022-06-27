const AppError = require("../utils/appError") ;
const axios = require("axios").default ;




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
    console.log("getFlightList req recieved");
    const url = "https://respina24.ir/flight/Availability" ;
    body = req.body ;
    const response = await axios.post(url, body) ;
    res.send(response.data);
}
catch(err) {
console.log(err);
}


}