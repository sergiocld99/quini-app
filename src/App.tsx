import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DatePage from "./pages/DatePage";
import { store } from "./redux/Store";
import { goToNextDay, goToPreviousDay } from "./redux/Actions";
import { useState } from "react";

function App() {
  const [date, setDate] = useState(store.getState().fecha);

  store.subscribe(() => {
    setDate(store.getState().fecha);
  });

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <p>
            <b>Quini</b>
          </p>
          <nav>
            <p>¿Cuando salió?</p>
            <p>Predictor</p>
          </nav>
          <div className="current-date">
            <p
              className="date-nav-btn"
              onClick={(e) => store.dispatch(goToPreviousDay())}
            >
              ◀️
            </p>
            <p>
              <b>{date}</b>
            </p>
            <p
              className="date-nav-btn"
              onClick={(e) => store.dispatch(goToNextDay())}
            >
              ▶️
            </p>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<DatePage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
