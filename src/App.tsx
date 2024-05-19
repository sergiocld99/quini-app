import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DatePage from './pages/DatePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DatePage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
