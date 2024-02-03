import { useState } from 'preact/hooks'
import './app.css'
import SearchBox from './search.jsx'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + Preact</h1>
      <div class="card">
        <SearchBox />
      </div>
    </>
  )
}
