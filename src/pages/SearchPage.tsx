import { useState } from "react"
import { formatNumber } from "../utils/Utils"

type SearchResponse = {
    day: string,
    sorteo: string,
    numero: number,
    pos: number
}[]

const SearchPage = () => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<SearchResponse>([])

    return (
        <main>
            <div className="Search-query">
            <input type="number" value={query} min={0} max={99} onChange={e => setQuery(e.target.value.slice(0,2))} />
            <p className="search-btn p-link" onClick={e => {
                if (query.length){
                    setResults([])

                    fetch(`http://127.0.0.1:2100/search/${query}`)
                        .then(res => res.json() as Promise<SearchResponse>)
                        .then(res => setResults(res))
                }
            }}>🔍</p> </div>

            <ul className="Search-results">
                { results.map(r => (<div className={r.pos === 1 ? "res-container-cabeza" : "res-container"}>
                    <b>{formatNumber(r.numero)}</b>
                    <div className="result-info">
                        <p>{r.sorteo}</p>
                        <p>Día {r.day}, posición #{r.pos}</p>
                    </div>
                </div>)) }
            </ul>
        </main>
    )
}

export default SearchPage