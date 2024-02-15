import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Task from './components/Task';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/task/:id' element={<Task />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
