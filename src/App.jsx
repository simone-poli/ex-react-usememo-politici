import { useState, useEffect } from "react"
import "bootstrap"

function App() {

  async function fetchJson(url) {
    const res = await fetch(url)
    const obj = await res.json()
    return obj
}

const [politicians, setPoliticians] = useState([])


async function callPoliticians () {
  const data = await fetchJson("http://localhost:3333/politicians")
  setPoliticians(data)
  console.log(setPoliticians)
}

useEffect(() => {
  callPoliticians()
},[])
 

return (
  <>
<div>
  <div className="row">
  {politicians.map((politician) => (
    <div className="col-12 col-md-4 mb-4" key={politician.id}>
      <div className="card">
        <img src={politician.image} className="card-img-top" alt={politician.name} />
        <div className="card-body">
          <h4 className="card-title text-center text-primary">{politician.name}</h4>
          <p className="card-text fw-bold text-center">{politician.position}</p>
          <p className="card-text">{politician.biography}</p>
        </div>
      </div>
    </div>
  ))}
</div>
</div>

</>
)






}

export default App
