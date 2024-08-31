const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const app = require('./app')

// process.on('uncaughtException', (err) => {
// 	console.log('Uncaught Exception! Shutting down...')
// 	// console.log(err.name, err.message);
// 	process.exit(1)
// })
const connection=async(req,res,next)=>{
    try{
		const DB=await mongoose.connect(`${process.env.database_url}`);
       console.log("Successfully connect your appplictaion with database!!")
    }catch(err){
        return next(new AppError("Database connection are refused", 404));
    }
}
connection()
// const DB = process.env.MOGODB_CLUSTER.replace(
// 	'<password>',
// 	process.env.MOGODB_CLUSTER_PASSWORD
// )

// mongoose.set('strictQuery', true)
// mongoose
// 	.connect(DB, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	})
// 	.then(() => {
// 		console.log('MongoDB Cluster Connected')
// 	})
// 	.catch((error) => console.log(error))

const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

// process.on('unhandledRejection', (err) => {
// 	console.log('Unhandled Rejection! Shutting down...')
// 	console.log(err.name, err.message)
// 	server.close(() => {
// 		process.exit(1)
// 	})
// })
