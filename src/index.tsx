import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/Store';
import { addCabeza, addQuini } from './redux/Actions';
import NombreTurno from './models/NombresTurno';

const addCabezas = (quiniId: number, cabezas: number[]) => {
  for (let i=0; i<cabezas.length; i++){
    store.dispatch(addCabeza({quiniId, turno: {nombre: i, cabeza: cabezas[i]}}))
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

store.dispatch(addQuini("Ciudad"))
store.dispatch(addQuini("Provincia"))
store.dispatch(addQuini("Córdoba"))

addCabezas(1, [4, 2634, 3190, 5343, 4637])
addCabezas(2, [8940, 7900, 3467, 3556, 2640])

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
