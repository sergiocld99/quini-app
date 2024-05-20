import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import DatePage from "./pages/DatePage";
import { store } from "./redux/Store";
import { goToNextDay, goToPreviousDay } from "./redux/Actions";
import { useState } from "react";
import SearchPage from "./pages/SearchPage";
import PredictorPage from "./pages/PredictorPage";

function App() {
  const [date, setDate] = useState(store.getState().fecha);

  store.subscribe(() => {
    setDate(store.getState().fecha);
  });

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <NavLink to={"/"} className="no-link">
            <p className="home-btn">
              <b>Quini</b>
            </p>
          </NavLink>
          <nav>
            <NavLink to={"/buscador"} className="no-link">
              <p>¿Cuando salió?</p>
            </NavLink>

            <NavLink to={"/predictor"} className="no-link">
              <p>Predictor</p>
            </NavLink>
          </nav>
          <div className="current-date">
            <p
              className="date-nav-btn p-link"
              onClick={(e) => store.dispatch(goToPreviousDay())}
            >
              ◀️
            </p>
            <p className="date-text">
              <b>{date.split(" ")[1]}</b>
              <p className="day-of-week">{date.split(" ")[0]}</p>
            </p>
            <p
              className="date-nav-btn p-link"
              onClick={(e) => store.dispatch(goToNextDay())}
            >
              ▶️
            </p>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<DatePage />}></Route>
          <Route path="/buscador" element={<SearchPage/>}></Route>
          <Route path="/predictor" element={<PredictorPage/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
