import { Routes, Route } from 'react-router-dom';
import Header from './component/header/header';
import CreateOrder from './pages/createOrder/createOrder';
import ListOrder from './pages/listOrder/listOrder';

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path='/addbox' element={<CreateOrder />}></Route>
        <Route path='/listboxes' element={<ListOrder />}></Route>
      </Routes>
    </div>
  );
}

export default App;
