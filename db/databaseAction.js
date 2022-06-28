const app = require("../app") ; 

var promisses = []
var addObject  = async function(category, object) { 

    let keys = Object.keys(object) ;
    let values = Object.values(object) ; 
    for (var i = 0 ; i< keys.length ; i++) { 
        promisses[i] = new Promise((resolve, reject) => {
        
            app.client.HSET(category,  {[keys[i]]: values[i] }, (err, reply) => {
                if(err) {
                    reject(err);
                }
            else {
                    resolve(reply);
                }
            });
        });
    }

    Promise.all(promisses).then(values=> {
        console.log(values);
    })
}

var addFlightList = async function(category, arrayOfObject) {
    for(var i = 0 ; i < arrayOfObject.length ; i++){
        addObject(category + i.toString() , arrayOfObject[i])
        .then(data => {console.log("flight added")})
        .catch(err =>{console.log(err)});
    }
}

var getCachedBody = function(category) { 
let a =   app.client.hGetAll(category, (err, value)=>{
        if(err) {
            console.log("err");
            reject(err);
        }else{
            console.log("object");
            resolve(value);
        }
    });

return a ; 

}


var getFlightKeys = async function() { 
    let keys = app.client.keys("Flights*", function (err, arrayOfKeys) {
    if(err){
        reject(err)
    }
    else { 
        resolve(arrayOfKeys)
    }
    
})
return keys ; 
}


var getCachedFlightList = async function()
{     
let keys = await getFlightKeys()
    .then(function(data) {return data;})
    .catch(err => console.log(err)) ;

let list = [] ;

for (var i = 0 ; i < keys.length ; i++) { 
    let temp =await getCachedBody(keys[i].toString())
    .then(function(data) {return data;})
    .catch(err => console.log(err)) ;
    list.push(temp) ;
}
return list ;
}

exports.addObject = addObject ; 
exports.getCachedBody = getCachedBody ; 
exports.addFlightList = addFlightList  ;
exports.getCachedFlightList = getCachedFlightList ; 
exports.getFlightKeys = getFlightKeys ; 