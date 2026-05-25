import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {Outlet, Link} from "react-router-dom";


export default function App() {
  /*const [count, setCount] = useState(0) //0 is the count*/

  return (
    <div className = "app-container">
      <nav className = "menu">
        <Link to="/diary">Diary</Link>
        <Link to="/to-do">To-Do</Link>
      </nav>
      <main>
        <Outlet />
      </main> 
    </div>
  )
}


/*function Menu() {
    return
}*/
export function Entry() {
  return <h1 className="app-name">Thought Galaxy</h1>;
}
export function Diary() {
  return <h1>Diary</h1>;
}
export function ToDo() {
  return <h1>To-Do</h1>;
}
