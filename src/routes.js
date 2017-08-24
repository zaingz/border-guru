import { Router } from 'express'
import OrderModel from './OrderModel.js'

const routes = Router()

routes.get('/', (req, res, next) => {
  OrderModel.find({}, {_id: 0, __v: 0}, (err, orders) => {
    if (err) return next(err)
    res.send({data: orders})
  })
})

routes.post('/', (req, res, next) => {
  const {orderID, companyName, customerAddress, orderItem} = req.body
  new OrderModel({orderID, companyName, customerAddress, orderItem}).save((err, r) => {
    if (err) return next(err)
    res.json({data: {orderID, companyName, customerAddress, orderItem}})
  })
})

routes.put('/:orderID', (req, res, next) => {
  const {orderID} = req.params
  OrderModel.update({orderID}, { $set: req.body }, (err, r) => {
    if (err) return next(err)
    res.json({data: {updated: !!r.nModified}})
  })
})

routes.get('/search/company/:q', (req, res, next) => {
  const companyName = req.params.q
  OrderModel.find({companyName}, {_id: 0, __v: 0}, (err, orders) => {
    if (err) return next(err)
    res.json({data: orders})
  })
})

routes.get('/search/address/:q', (req, res, next) => {
  const customerAddress = req.params.q
  OrderModel.find({customerAddress}, {_id: 0, __v: 0}, (err, orders) => {
    if (err) return next(err)
    res.json({data: orders})
  })
})

routes.get('/count', (req, res, next) => {
  OrderModel.aggregate([
    {
      '$group': {

        '_id': '$orderItem',
        'total': { '$sum': 1 }
      }
    },
    { '$sort': { 'total': -1 } }
  ]).exec((err, data) => {
    if (err) return next(err)
    res.json({data: data})
  })
})

export default routes
