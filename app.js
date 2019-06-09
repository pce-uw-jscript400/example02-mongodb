const { MONGO_DB_CONNECTION, NODE_ENV, PORT } = process.env
const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect(MONGO_DB_CONNECTION, { useNewUrlParser: true })

if (NODE_ENV === 'development') app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

app.use('/pies', require('./api/routes/pies'))

app.use((req, res, next) => {
  const error = new Error(`Could not ${req.method} ${req.path}`)
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  const { message, status } = err
  res.status(status).json({ status, message })
})

const listener = () => console.log(`Listening on Port ${PORT}!`)
app.listen(PORT, listener)
