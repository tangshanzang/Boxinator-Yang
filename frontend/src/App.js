import { Routes, Route } from 'react-router-dom';
import Header from './component/header/header';
import CreateOrder from './pages/createOrder/createOrder';
import ListOrder from './pages/listOrder/listOrder';
import Home from './pages/home/home';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    document.title = "Boxinator-Yang"
  }, [])

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/addbox' element={<CreateOrder />}></Route>
        <Route path='/listboxes' element={<ListOrder />}></Route>
      </Routes>
    </div>
  );
}

export default App;
