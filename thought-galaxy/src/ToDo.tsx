import {Search} from './App.tsx';
import './App.css';
export default function ToDo() {
  return (
    <div>
        <h1 className="header">To-Do</h1>
        <Search buttonName="New List"/>
    </div>
  )
}