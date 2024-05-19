import { useEffect, useState } from "react";
import { store } from "../redux/Store";
import { addCabeza, cleanSorteos } from "../redux/Actions";
import ApiResponse from "../api/ApiResponse";
import TablaQuiniela from "../components/TablaQuiniela";

const DatePage = () => {
  const [quinis, setQuinis] = useState(store.getState().quinielas);
  const [date, setDate] = useState(store.getState().fecha);

  store.subscribe(() => {
    setQuinis(store.getState().quinielas);
    setDate(store.getState().fecha);
    console.log("Store changed!");
  });

  useEffect(() => {
    // http is mandatory in order to access other port or website
    // CORS must be enabled in backend
    fetch(`http://127.0.0.1:2100/${date}`)
      .then((res) => res.json() as Promise<ApiResponse>)
      .then((data) => {
        console.log("Resultados obtenidos");
        store.dispatch(cleanSorteos());

        data.forEach((sorteo, index) => {
          store.dispatch(
            addCabeza({
              quiniId: index % 6,
              cabeza: sorteo.numeros[0],
            })
          );
        });
      });
  }, [date]);

  return (
    <main>
      <ul>
        {quinis.map((q) => (
          <li key={"q-" + q.id}>
            <TablaQuiniela {...q} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default DatePage;
