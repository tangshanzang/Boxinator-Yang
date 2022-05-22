import OrderDetails from '../../component/orderDetails/orderDetails'
import { useSelector, useDispatch } from 'react-redux';
import { setAllOrdersFromDB } from '../../store/boxReducer';

const ListOrder = () => {
  const { allOrdersFromDBReversed } = useSelector((state) => state.boxer);
  const dispatch = useDispatch();
  const getOrdersWss = new WebSocket('ws://localhost:4000/getorders');

  getOrdersWss.onopen = () => getOrdersWss.send(JSON.stringify('Load order lists'));

  getOrdersWss.onmessage = (list) => {
    let orderListFromDB = JSON.parse(list.data);
    dispatch(setAllOrdersFromDB(orderListFromDB));
  }

  return (
    <div>
      <div className='orderDetailsComponent'>
        {allOrdersFromDBReversed.map((order, index) => {
          return <OrderDetails order={order} key={index} />
        })}
      </div>
    </div>
  )
}

export default ListOrder