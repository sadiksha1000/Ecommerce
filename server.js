// interact with paths
import path from 'path'

// requiring express to handle requests, routes and views
import express,{json} from 'express'

// dotenv-loads environment variables from .env
import dotenv from 'dotenv'

import colors from 'colors'

// morgan-http level middleware 
import morgan from 'morgan'

import connectDB from './config/db.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'

import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

// configures .env file to process.env
dotenv.config()

// Invoke connectDB
connectDB()

const app=express()

// Run morgan ONLY if in development mode
// morgan logs all activities
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}
// Inbuilt method to recognize the incoming request object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes to respective imports
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
)

// // requiring cors to enable apis requests from all devices
// const cors=require('cors');
// app.use(cors());

// Make uploads folder static
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Load build folder as static ONLY in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')))
	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	)
} else {
	// test get route
	app.get('/', (req, res) => {
		res.send('API is running...')
	})
}

// Error middleware for 404
app.use(notFound)

// Error handler middleware
app.use(errorHandler)

// Set port number
const PORT = process.env.PORT || 90

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
)




