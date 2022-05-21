import React from 'react'

const orderDetails = (props) => {
  return (
    <div>
      <div className="receiver">
        <p>Receiver</p>
        <p>{props.order.name}</p>
      </div>
      <div className="weight">
        <p>Weight</p>
        <p>{props.order.weight + ' kilograms'}</p>
      </div>
      <div className="boxColour">
        <p>Box colour</p>
        <p>1{props.order.colour}</p>
      </div>
      <div className="shippingCost">
        <p>Shipping cost</p>
        <p>{props.order.cost + ' SEK'}</p>
      </div>
    </div>
  )
}

export default orderDetails