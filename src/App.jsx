import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Task from './components/Task';
import Header from './components/Header';

function App() {
  return (
    <div className=' w-screen h-screen'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/task/:id' element={<Task />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
