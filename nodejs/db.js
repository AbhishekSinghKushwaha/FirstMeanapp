var mongoose = require("mongoose");

// Connect to database (It will search for the cat_app database if it is not present then it will create a new one)
mongoose.connect("mongodb://localhost/registereddetails", (err)=>{
    if(!err)
    {console.log("Mongodb connection succeeded...")}
    else
    {console.log("Error in DB Connection...")}
});


module.exports = mongoose;
