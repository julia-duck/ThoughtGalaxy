import {Search} from './App.tsx';
import {useState} from 'react';
import {Trash2} from 'lucide-react';
import './Diary.css';
import './App.css';
export default function Diary() {
    const [entryOpen, setEntryOpen] = useState(false); /* eventually default false */
    /* testing purposes */
    let testEntry: DiaryEntry = {
        id: 1,
        title: "Test Entry",
        body: "I am a test entry",
        date: "6/27/26",
        arrIdx: 0
    }
    const [entriesArr, setEntries] = useState<DiaryEntry[]>([testEntry]); //eventually set to saved entries?

    const toggles: DiaryToggle = {
        setOpened(value) {
            setEntryOpen(value);
        },
        addEntry(value) {
            setEntries([...entriesArr, value]);
        }
    }
    return (
        <div>
            {(entryOpen) ? 
            (<DiaryEntryExpanded {...toggles} {...entriesArr[0]} entriesArr={entriesArr}/>) :
            (<DiaryEntryCondensed toggles={toggles}/>)}
        </div>
  )
}

export interface DiaryToggle {
    setOpened: (value: boolean) => void; //function, (parameters) => return type
    addEntry: (value: DiaryEntry) => void;
}
export interface ToggleBundle {
    toggles: DiaryToggle;
}

export interface DiaryEntry {
    id: number; //entry ID
    title: string;
    body: string;
    date: string;
    arrIdx: number;
}
//has all props of DiaryEntry, with additional props (properties)
export interface DiaryProps extends DiaryEntry {
    entriesArr: DiaryEntry[];
}

function DiaryEntryExpanded({setOpened, addEntry, id, title, body, date, arrIdx, entriesArr}: DiaryToggle & DiaryProps) {
    /* add editor useState here*/

    let hasPrev: boolean, hasNext: boolean, prevIdx: number, nextIdx: number;
    if (arrIdx == 0) {
        hasPrev = false;
        prevIdx = arrIdx;
    }
    else {
        hasPrev = true;
        prevIdx = arrIdx - 1;
    }
    if (arrIdx == entriesArr.length-1) {
        hasNext = false;
        nextIdx = arrIdx;
    }
    else {
        hasNext = true;
        nextIdx = arrIdx + 1;
    }

    //Function to add entry
    let saveEntry = () => {
        //need the useState that updates based on what user types
        setOpened(false);
    }

    return (
        <div>
            <h1 className="header-1">Diary</h1>
            <div className="entry-box">
                <div className="top-bar">
                    <input className="title-box" placeholder="Title" value={title}/>
                    <div className="date">{date}</div>
                </div>
                <textarea
                    className="text-box"
                    rows={27}
                    cols={60}
                    placeholder="Start your entry"
                >
                    {body}
                </textarea>
                <div className="bottom-bar">
                    <button className="delete-note">
                        {/*figure out how to delete from backend 
                        and if have to delete from arr too or arr re-fetch from backend*/}
                        <Trash2 className="trash-button"/>
                    </button>
                    <button className="save-button" onClick={saveEntry}>Save & Close</button>
                </div>
            </div>
        </div>
        
    )
}

function DiaryEntryCondensed({toggles}:ToggleBundle) {
    return (
        <div>
            <h1 className="header-2">Diary</h1>
            <Search buttonName="New Entry" {...toggles}/>
        </div>
    )
}