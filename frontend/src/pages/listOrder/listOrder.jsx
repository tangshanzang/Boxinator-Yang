import OrderDetails from '../../component/orderDetails/orderDetails'
import { useSelector, useDispatch } from 'react-redux';
import { setAllOrdersFromDB } from '../../store/boxReducer';
import { useEffect, useRef } from 'react';
import './listOrder.css'

const ListOrder = () => {
  const { allOrdersFromDBReversed } = useSelector((state) => state.boxer);
  const dispatch = useDispatch();
  const ws = useRef(null);

  const summaryCalucation = (e) => {
    let totalWeight = 0;
    let totalCost = 0;
    allOrdersFromDBReversed.forEach(order => {
      switch (e) {
        case 'weight': {
          totalWeight += order.weight;
          break;
        }
        case 'cost': {
          totalCost += order.cost;
          break;
        }
        default: {

        }
      }
    });

    if (e === 'weight') {
      return Math.round(totalWeight);
    }
    else {
      return Math.round(totalCost);
    }
  }

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
      <div className="summaryContainer">
        <div className="totalWeightContainer">
          <div className="totalWeightTitle">
            <p>Total Weight</p>
          </div>
          <div className="totalWeightValue">
            <p>{summaryCalucation('weight') + ' kilograms'}</p>
          </div>
        </div>
        <div className="totalCostContainer">
          <div className="totalCostTitle">
            <p>Total Cost</p>
          </div>
          <div className="totalCostValue">
            <p>{summaryCalucation('cost') + ' SEK'}</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ListOrder