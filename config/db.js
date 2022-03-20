// Requiring mongoose to work with database.
import mongoose from 'mongoose'

// Connection to Database
const connectDB=async()=>{
   try{
       const conn=await mongoose.connect(process.env.MONGO_URI,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
       })
       console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
   } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    // exit with failure
    process.exit(1)
}
}

export default connectDB


