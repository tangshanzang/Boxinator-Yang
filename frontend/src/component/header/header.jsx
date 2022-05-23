import { Link } from "react-router-dom"
import './header.css'

const header = () => {
  return (
    <div className="headerContainer">
      <Link to='/'>
        <button className="homeBtn">Home</button>
      </Link>

      <Link to='/addbox'>
        <button className="createOrderBtn">Create Order</button>
      </Link>

      <Link to='/listboxes'>
        <button className="viewOrderBtn">View Orders</button>
      </Link>
    </div>
  )
}

export default header