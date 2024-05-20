import { useEffect, useState } from "react";
import ApiResponse from "../api/ApiResponse";
import { getFamily, getIndexOfMaxValue } from "../utils/Utils";
import PredictResponse from "../api/PredictResponse";

const PredictorPage = () => {
  const [lastCode, setLastCode] = useState("");
  const [predicts, setPredicts] = useState<PredictResponse>([])

  const numbers: number[] = Array(100);
  for (let i = 0; i < numbers.length; i++) numbers[i] = i;

  useEffect(() => {
    fetch("http://127.0.0.1:2100/codes/last")
      .then((res) => res.json() as Promise<{ code: string }>)
      .then((res1) => {
        setLastCode(res1.code);

        // get last results
        fetch(`http://127.0.0.1:2100/${res1.code}`)
          .then((res) => res.json() as Promise<ApiResponse>)
          .then((res) => {
            const candidates: number[] = Array(100).fill(0);

            res.forEach((sorteo, i) => {
              let fam = getFamily(sorteo.numeros[0]);
              candidates[fam] += 6 - (i % 6);
            });

            const best = getIndexOfMaxValue(candidates);
            fetch(`http://127.0.0.1:2100/predict/${best}/${res1.code}`)
                .then((res) => res.json() as Promise<PredictResponse>)
                .then((res) => setPredicts(res))
          });
      });
  }, []);

  return (
    <main>
      <h2>Predicciones en base a las cabezas del día {lastCode}</h2>
      <div className="numbers-grid">
        {numbers.map((n) => {
          let pred = predicts.find(p => p.num === n)
          if (pred) {
            return <b className="featured-number" style={{opacity: pred.score > 100 ? 1.0 : 0.5}}>{n}</b>
          } else {
            return <b className="normal-number">{n}</b>
          }
        } )}
      </div>
    </main>
  );
};

export default PredictorPage;
