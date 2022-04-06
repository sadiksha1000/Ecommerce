import './App.css';
import {BrowserRouter,Routes, Route,Redirect} from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Home from './components/Home';
import NotFound from './components/NotFound';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/cart' element={<Cart/>} />
          <Route path='/' element={<Home/>} />
          <Route path='/not-found' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
