import { useState } from 'react';
import LotusLogo from './assets/lotuslogo.svg';
import './App.css';
import {Outlet, NavLink} from "react-router-dom";


export default function App() {
  /*const [count, setCount] = useState(0) //0 is the count*/

  return (
    <div className = "app-container">
      <nav className = "menu">
        <img id="logo" src={LotusLogo}/>
        <NavLink to="/diary" className={({isActive}) => isActive ? "active-tab" : "tab"}>Diary</NavLink>
        <NavLink to="/to-do" className={({isActive}) => isActive ? "active-tab" : "tab"}>To-Do</NavLink>
      </nav>
      <main>
        <Outlet />
      </main> 
    </div>
  )
}

export function Entry() {
  return <h1 className="header">Thought Galaxy</h1>;
}


