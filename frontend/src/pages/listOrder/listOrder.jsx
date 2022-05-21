import OrderDetails from '../../component/orderDetails/orderDetails'

const listOrder = () => {
  const tempSampleOrders = [{
    name: 'Yang',
    weight: 22,
    colour: 12,
    cost: 20
  }]

  return (
    <div>
      <div className='orderDetailsComponent'>
        {tempSampleOrders.map((order, index) => {
          return <OrderDetails order={order} key={index} />
        })}
      </div>
    </div>
  )
}

export default listOrder