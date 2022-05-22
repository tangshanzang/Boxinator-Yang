import { Routes, Route } from 'react-router-dom';
import Header from './component/header/header';
import CreateOrder from './pages/createOrder/createOrder';
import ListOrder from './pages/listOrder/listOrder';

function App() {
  const createOrderWss = new WebSocket('ws://localhost:4000/createorder');
  const getOrdersWss = new WebSocket('ws://localhost:4000/getorders');
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path='/addbox' createOrderWss={createOrderWss} element={<CreateOrder />}></Route>
        <Route path='/listboxes' getOrdersWss={getOrdersWss} element={<ListOrder />}></Route>
      </Routes>
    </div>
  );
}

export default App;
