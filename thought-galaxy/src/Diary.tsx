import {Search} from './App.tsx';
import {useState} from 'react';
import './Diary.css';
import './App.css';
export default function Diary() {
    const [entryOpen, setEntryOpen] = useState(true); /* eventually default false */
    return (
        <div>
            {(entryOpen) ? (<DiaryEntryExpanded/>) : (<DiaryEntryCondensed/>)}
        </div>
  )
}

function DiaryEntryExpanded() {
    return (
        <div>
            <h1 className="header-1">Diary</h1>
            <div className="entry-box">
                <input className="title-box" placeholder="Title"/>
                <textarea
                    className="text-box"
                    rows={27}
                    cols={60}
                    placeholder="Start your entry"
                />
                <div className="bottom-bar">
                    <button className="save-button">Save & Close</button>
                </div>
            </div>
        </div>
        
    )
}

function DiaryEntryCondensed() {
    return (
        <div>
            <h1 className="header-2">Diary</h1>
            <Search buttonName="New Entry"/>
        </div>
    )
}