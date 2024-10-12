const mongoose = require('mongoose')
require("dotenv").config();
const app = require('./app')
const AppError = require('./Utils/appError')


const connection=async(req,res,next)=>{
    try{
		const DB=await mongoose.connect(`${process.env.database_url}`);
       console.log("Successfully connect your appplictaion with database!!")
    }catch(err){
        return next(new AppError("Database connection are refused", 404));
    }
}
connection()


const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})


