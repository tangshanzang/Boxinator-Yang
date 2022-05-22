import OrderDetails from '../../component/orderDetails/orderDetails'

const listOrder = () => {
  const getOrdersWss = new WebSocket('ws://localhost:4000/getorders');

  getOrdersWss.onmessage = (list) => {
    console.log(list)
    console.log(list.data)
    console.log(JSON.parse(list))
    console.log(JSON.stringify(list))
  }

  const tempSampleOrders = [{
    name: 'Yang',
    weight: 22,
    colour: 12,
    cost: 20
  }]

  const test = () => {
    getOrdersWss.send(JSON.stringify('yo'))
  }

  return (
    <div>
      <button className="btn" onClick={test}>111</button>
      <div className='orderDetailsComponent'>
        {tempSampleOrders.map((order, index) => {
          return <OrderDetails order={order} key={index} />
        })}
      </div>
    </div>
  )
}

export default listOrder