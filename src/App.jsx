import  { useState, useEffect, memo } from "react"


function App() {

  async function fetchJson(url) {
    const res = await fetch(url)
    const obj = await res.json()
    return obj
}

const [politicians, setPoliticians] = useState([])
const [searchPoliticians, setSearchPoliticians] = useState("")
const filteredPoliticians = politicians.filter(p =>
  p.name.toLowerCase().includes(searchPoliticians.toLowerCase()) ||
  p.biography.toLowerCase().includes(searchPoliticians.toLowerCase())
);


async function callPoliticians () {
  const data = await fetchJson("http://localhost:3333/politicians")
  setPoliticians(data)
}

useEffect(() => {
  callPoliticians()
},[])

function politiciansCard ({politician}){
  console.log(politician.name)
  return(
    <div className="col-12 col-md-4 mb-4">
      <div className="card">
        <img src={politician.image} className="card-img-top" alt={politician.name} />
        <div className="card-body">
          <h4 className="card-title text-center text-primary">{politician.name}</h4>
          <p className="card-text fw-bold text-center">{politician.position}</p>
          <p className="card-text">{politician.biography}</p>
        </div>
      </div>
    </div>
)}


const MemoPolitician = memo(politiciansCard)

return (
  <>
<div>
  <div className="text-center m-4">
  <input 
  type="text" 
  placeholder="Filtra politico..."
  value={searchPoliticians}
  onChange={(e) => setSearchPoliticians(e.target.value)}
  />
  <button className="m-2">Avvia ricerca</button>
  </div>
  <div className="row">
    {filteredPoliticians.map((p) => (
      <MemoPolitician key={p.id} politician={p}/>
    ))}
  </div>
</div>

</>
)






}

export default App
