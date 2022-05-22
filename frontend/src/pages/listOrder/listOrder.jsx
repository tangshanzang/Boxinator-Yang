import OrderDetails from '../../component/orderDetails/orderDetails'
import { useSelector, useDispatch } from 'react-redux';
import { setAllOrdersFromDB } from '../../store/boxReducer';
import { useEffect, useRef } from 'react';

const ListOrder = () => {
  const { allOrdersFromDBReversed } = useSelector((state) => state.boxer);
  const dispatch = useDispatch();
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:4000/getorders');
    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onopen = () => ws.current.send(JSON.stringify('Load order lists'));

    ws.current.onmessage = e => {
      let orderListFromDB = JSON.parse(e.data);
      dispatch(setAllOrdersFromDB(orderListFromDB));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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