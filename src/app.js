import express from 'express'

import logger from 'morgan'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import routes from './routes'
import seed from './seed.js'

// mongoose.connect('mongodb://mongo:27017')
mongoose.connect('mongodb://mongo:27017/test')

const app = express()

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Seed the db
seed()
// Routes
app.use('/orders', routes)

// Error handler
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json('error', {
      message: err.message
    })
})

export default app
