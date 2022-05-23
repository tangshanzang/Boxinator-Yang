import React from 'react'
import './orderDetails.css'

const orderDetails = (props) => {
  return (
    <div className='detailContainer'>
      <div className="receiver">
        <div className="title">
          <p>Receiver</p>
        </div>
        <div className="receiver-Value">
          <p>{props.order.name}</p>
        </div>
      </div>
      <div className="weight">
        <div className="title">
          <p>Weight</p>
        </div>
        <div className="weight-Value">
          <p>{props.order.weight + ' kilograms'}</p>
        </div>
      </div>
      <div className="boxColour">
        <div className="title">
          <p>Box colour</p>
        </div>
        <div className="boxColour-Value">
          <p>{props.order.colour}</p>
        </div>
      </div>
      <div className="shippingCost">
        <div className="title">
          <p>Shipping cost</p>
        </div>
        <div className="shippingCost-Value">
          <p>{props.order.cost + ' SEK'}</p>
        </div>
      </div>
    </div>
  )
}

export default orderDetails