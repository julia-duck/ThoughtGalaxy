/*import { useState } from 'react';*/
import LotusLogo from './assets/lotuslogo.svg';
import './App.css';
import {Outlet, NavLink, Link} from "react-router-dom";
import type {ToggleBundle} from './Diary.tsx';


export default function App() {

  return (
    <div className = "app-container">
      <nav className = "menu">
        <div className="complete-logo">
          <Link to='/'>
            <img id="logo" src={LotusLogo}/>
          </Link>
          <div className="logo-text">
            <p className="logo-text">Thought<br/>Galaxy</p>
          </div>
        </div>
        <div className="space"></div>
        <NavLink to="/diary" className={({isActive}) => isActive ? "active-tab" : "tab"}>Diary</NavLink>
        <NavLink to="/to-do" className={({isActive}) => isActive ? "active-tab" : "tab"}>To-Do</NavLink>
      </nav>
      <main className="main-content">
        <Outlet />
      </main> 
    </div>
  )
}

export function Entry() {
  return (
    <div>
      <h1 className="header">Thought Galaxy</h1>
      <div className="space"></div>
      <p>Welcome to Thought Galaxy, a space to save memories, express yourself, and organize your thoughts and tasks.</p>
    </div>

  )
}

export function Search({buttonName, entryLen, setOpened, addEntry}:{buttonName: string} & ToggleBundle) {
    function newEntry() {
      addEntry({
        id: 0,
        title: "",
        body: "",
        date: new Date().toLocaleString(),
        arrIdx: entryLen
      });
      setOpened(true); //maybe make function that setopened to true and also pass in variable to expanded entry saying it is new entry
    }

    return (
      <div className="search-complex" style={{display: 'flex'}}>
        <button className="new-button" onClick={newEntry}>{buttonName}</button>
        <input placeholder="Search Entries" className="search-bar"/>
        <button className="search-button">Search</button>
      </div>
    )
}


