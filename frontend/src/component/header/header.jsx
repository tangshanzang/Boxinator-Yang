import { Link } from "react-router-dom"

const header = () => {
  return (
    <div>
      <Link to='/addbox'>
        <button className="createOrderbtn">Create Order</button>
      </Link>

      <Link to='/listboxes'>
        <button className="viewOrderbtn">View Orders</button>
      </Link>
    </div>
  )
}

export default header