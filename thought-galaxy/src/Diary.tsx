import {Search} from './App.tsx';
import {useState, useRef} from 'react';
import {Trash2} from 'lucide-react';
import './Diary.css';
import './App.css';
//re-renders if something changes (like useState variable)
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
        },
        changeEntry(key, newEnt) {
            //build new array where object that matches key is replaced, rest is kept
            setEntries(entriesArr.map((entry) => {
                if (entry.id == key) {
                    return newEnt;
                }
                return entry;
            }));
        }
    }
    return (
        <div>
            {(entryOpen) ? 
            (<DiaryEntryExpanded {...toggles} {...entriesArr[0]} entriesArr={entriesArr}/>) :
            (<DiaryEntryCondensed {...toggles} entryLen = {entriesArr.length}/>)}
        </div>
  )
}

export interface DiaryToggle {
    setOpened: (value: boolean) => void; //function, (parameters) => return type
    addEntry: (value: DiaryEntry) => void;
    changeEntry: (key: number, newEnt: DiaryEntry) => void;
}
export interface ToggleBundle extends DiaryToggle {
    entryLen: number;
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

function DiaryEntryExpanded({setOpened, addEntry, changeEntry, id, title, body, date, arrIdx, entriesArr}: DiaryToggle & DiaryProps) {
    /* can rassign .current value but not the entire variable pointer */
    const titleValue = useRef(null);
    const bodyText = useRef(null);

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
        //add or change entry
        //read titleValue.current.value and save
        setOpened(false);
    }

    return (
        <div>
            <h1 className="header-1">Diary</h1>
            <div className="entry-box">
                <div className="top-bar">
                    {/*titleValue set to reference the input element, can use .current.value to check text value of element*/}
                    <input className="title-box" placeholder="Title" defaultValue={title} ref={titleValue}/>
                    <div className="date">{date}</div>
                </div>
                <textarea
                    className="text-box"
                    rows={27}
                    cols={60}
                    placeholder="Start your entry"
                    ref={bodyText}
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

function DiaryEntryCondensed(toggles:ToggleBundle) {
    return (
        <div>
            <h1 className="header-2">Diary</h1>
            <Search buttonName="New Entry" {...toggles}/>
        </div>
    )
}