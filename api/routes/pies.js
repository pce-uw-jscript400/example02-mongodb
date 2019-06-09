const router = require('express').Router()
const mongoose = require('mongoose')
const Pie = require('../models/pie')

const REQUIRED_KEYS = ['name', 'rating']
const validate = (req, res, next) => {
  const error = new Error('Bad request')
  error.status = 400
  if (!req.body) next(error)

  const hasAllKeys = REQUIRED_KEYS.every(key => req.body[key])
  if (!hasAllKeys) next(error)

  const noExtraKeys = Object.keys(req.body).every(key => REQUIRED_KEYS.includes(key))
  if (!noExtraKeys) next(error)

  next()
}

router.get('/', async (req, res, next) => {
  try {
    const status = 200
    const response = await Pie.find().select('name rating')

    res.status(status).json({ status, response })
  } catch (error) {
    error.status = 500
    error.message = `${req.method} ${req.path} failed. Internal server error.`
    next(error)
  }
})

router.post('/', validate, async (req, res, next) => {
  try {
    const { name, rating } = req.body
    const pie = new Pie({ _id: mongoose.Types.ObjectId(), name, rating })
    const response = await pie.save()
    const status = 201

    res.status(status).json({ status, response })
  } catch (error) {
    error.status = 500
    error.message = `${req.method} ${req.path} failed. Internal server error.`
    next(error)
  }
})

module.exports = router
