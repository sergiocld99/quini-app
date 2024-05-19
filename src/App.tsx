import React, { useEffect, useReducer, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { store } from './redux/Store';
import { addQuini } from './redux/Actions';
import TablaQuiniela from './components/TablaQuiniela';

function App() {
  const [quinis, setQuinis] = useState(store.getState())
  console.log(store.getState())

  store.subscribe(() => {
    setQuinis(store.getState())
    console.log(store.getState())
  })

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <b>Quini</b>
        </p>
      </header>
      <main>
        <ul>
          {
            quinis.map(q => <li key={"q-" + q.id}>
              <TablaQuiniela {...q} />
            </li> )
          }
        </ul>
      </main>
    </div>
  );
}

export default App;
