import mongoose from 'mongoose'

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

var orderSchema = new mongoose.Schema(
  {
    orderID: Number,
    companyName: String,
    customerAddress: String,
    orderItem: String
  })

export default mongoose.model('Order', orderSchema)
