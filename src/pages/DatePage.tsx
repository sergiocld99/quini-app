import { useEffect, useState } from "react";
import { store } from "../redux/Store";
import { addCabeza, cleanSorteos } from "../redux/Actions";
import ApiResponse from "../api/ApiResponse";
import TablaQuiniela from "../components/TablaQuiniela";

const DatePage = () => {
  const [quinis, setQuinis] = useState(store.getState().quinielas);
  const [date, setDate] = useState(store.getState().fecha);
  const [bestFamily, setBestFamily] = useState([0,0])

  store.subscribe(() => {
    setQuinis(store.getState().quinielas);
    setDate(store.getState().fecha);
    console.log("Store changed!");
  });

  useEffect(() => {
    // http is mandatory in order to access other port or website
    // CORS must be enabled in backend
    fetch(`http://127.0.0.1:2100/${date.split(" ")[1]}`)
      .then((res) => res.json() as Promise<ApiResponse>)
      .then((data) => {
        const familias = Array(100).fill(0)
        store.dispatch(cleanSorteos());

        data.forEach((sorteo, index) => {
          store.dispatch(
            addCabeza({
              quiniId: index % 6,
              cabeza: sorteo.numeros[0],
            })
          );

          // agregar a familia
          let num = sorteo.numeros[0] % 100
          let unidad = num % 10
          let decena = Math.floor(num / 10)
          let fam = unidad < decena ? (unidad * 10 + decena) : num
          familias[fam] += (5 - index % 6)
        });

        // set best family
        let best = 0
        let max = familias[0]
        for (let i=1; i<familias.length; i++){
          if (familias[i] > max){
            max = familias[i]
            best = i
          }
        }
        setBestFamily([best, (best % 10) * 10 + Math.floor(best / 10)])
        console.log(best + " is best family")
      });
  }, [date]);

  return (
    <main>
      <ul>
        {quinis.map((q) => (
          <li key={"q-" + q.id}>
            <TablaQuiniela quini={q} bestF={bestFamily} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default DatePage;
