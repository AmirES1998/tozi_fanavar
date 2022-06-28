const {expressApp} = require("./app") ;
const dotenv = require("dotenv") ; 
dotenv.config({
    path:'./config.env'
}) ; 


const port = process.env.PORT ; 
expressApp.listen(port, ()=>{
    console.log(`Application is running on port ${port}`);
}) ; 


