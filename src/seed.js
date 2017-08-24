import OrderModel from './OrderModel.js'

const data = [
  {orderID: 1, companyName: 'SuperTrader', customerAddress: 'Steindamm 80', orderItem: 'Macbook'},
  {orderID: 2, companyName: 'Cheapskates', customerAddress: 'Reeperbahn 153', orderItem: 'Macbook'},
  {orderID: 3, companyName: 'MegaCorp', customerAddress: 'Steindamm 80', orderItem: "Book 'Guide to Hamburg'"},
  {orderID: 4, companyName: 'SuperTrader', customerAddress: 'Sternstrasse 125', orderItem: "Book 'Cooking 101'"},
  {orderID: 5, companyName: 'SuperTrader', customerAddress: 'Ottenser Hauptstrasse 24', orderItem: 'Inline Skates'},
  {orderID: 6, companyName: 'MegaCorp', customerAddress: 'Reeperbahn 153', orderItem: 'Playstation'},
  {orderID: 7, companyName: 'Cheapskates', customerAddress: 'Lagerstrasse 11', orderItem: 'Flux compensator'},
  {orderID: 8, companyName: 'SuperTrader', customerAddress: 'Reeperbahn 153', orderItem: 'Inline Skates'}
]

OrderModel.remove().exec()
const seed = () => {
  OrderModel.find(function (err, orders) {
    if (err) return console.error(err)
    if (!orders.length) {
      data.map(order => new OrderModel(order).save())
    }
  })
}

export default seed
