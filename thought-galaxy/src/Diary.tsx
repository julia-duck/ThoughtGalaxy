import {Search} from './App.tsx';
import {useState, useRef, createContext, useContext} from 'react';
import {Trash2} from 'lucide-react';
import './Diary.css';
import './App.css';

interface DiaryIdxContextType {
    diaryIdx: number;
    setDiaryIdx: (idx: number) => void;
}

const DiaryIdx = createContext<DiaryIdxContextType | null>(null);

//re-renders if something changes (like useState variable)
export default function Diary() {
    const [entryOpen, setEntryOpen] = useState(false); /* eventually default false */
    const [diaryIdx, setDiaryIdx] = useState(0);
    const [entriesArr, setEntries] = useState<DiaryEntry[]>([]); //eventually set to saved entries?

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
        },
        deleteEntry(key) {
            setEntries(entriesArr.filter((entry) => entry.id != key));
        }
    }
    return (
        <DiaryIdx.Provider value={{diaryIdx, setDiaryIdx}}>
            {(entryOpen) ? 
            (<DiaryEntryExpanded key={diaryIdx} {...toggles} {...entriesArr[diaryIdx]} entriesArr={entriesArr}/>) :
            (<DiaryEntryCondensed {...toggles} {...entriesArr[diaryIdx]} entryLen = {entriesArr.length} entriesArr={entriesArr} setIdx={setDiaryIdx}/>)}
        </DiaryIdx.Provider>
  )
}

export interface DiaryToggle {
    setOpened: (value: boolean) => void; //function, (parameters) => return type
    addEntry: (value: DiaryEntry) => void;
    changeEntry: (key: number, newEnt: DiaryEntry) => void;
    deleteEntry: (key: number) => void;
}
export interface ToggleBundle extends DiaryToggle {
    entryLen: number;
    setIdx: (idx: number) => void;
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

function DiaryEntryExpanded({setOpened, changeEntry, deleteEntry, id, title, body, date, arrIdx, entriesArr}: DiaryToggle & DiaryProps) {
    /* can rassign .current value but not the entire variable pointer */
    const titleValue = useRef(null);
    const bodyText = useRef(null);
    const { setDiaryIdx } = useContext(DiaryIdx)!;
    let [entryTitle, setEntryTitle] = useState(title);
    let [entryBody, setEntryBody] = useState(body);

    let thisEntry: DiaryEntry = {
        id: id,
        title: entryTitle,
        body: entryBody,
        date: date,
        arrIdx: arrIdx
    }

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
        //change entry
        //read titleValue.current.value and save
        (entryTitle == "") ? alert("Please title your entry") : (
            changeEntry(id, thisEntry),
            setOpened(false)
        );
    }

    let discardChanges = () => {
        setOpened(false);
    }

    let deleteEnt = () => {
        deleteEntry(id);
        setOpened(false);
    }

    return (
        <div>
            <h1 className="header-1">Diary</h1>
            <div className="entry-complex">
                {(hasPrev) && <button className="left-button" 
                onClick={() => setDiaryIdx(prevIdx)}>{`<`}</button>}
                <div className="entry-box">
                    <div className="top-bar">
                        {/*titleValue set to reference the input element, can use .current.value to check text value of element*/}
                        <input className="title-box" 
                        placeholder="Title" 
                        defaultValue={title} 
                        key={id}
                        ref={titleValue}
                        onChange={(e) => setEntryTitle(e.target.value)}/>
                        <div className="date">{date}</div>
                    </div>
                    <textarea
                        className="text-box" 
                        rows={27}
                        cols={60}
                        placeholder="Start your entry"
                        ref={bodyText}
                        defaultValue={body}
                        key={id}
                        onChange={(e) => setEntryBody(e.target.value)}
                    /> 
                    <div className="bottom-bar"> 
                        <button className="delete-note" onClick={deleteEnt}>
                            {/*figure out how to delete from backend 
                            and if have to delete from arr too or arr re-fetch from backend*/}
                            <Trash2 className="trash-button"/>
                        </button>
                        <button className="save-button" onClick={saveEntry}>Save & Close</button>
                        {(thisEntry.title != title || thisEntry.body != body) &&
                        <button className="discard-changes" onClick={discardChanges}>Discard Changes</button>}
                    </div>
                </div>
                {(hasNext) && <button className="right-button"
                onClick={() => setDiaryIdx(nextIdx)}>{`>`}</button>}
            </div>
        </div>
        
    )
}

function DiaryEntryCondensed(props:ToggleBundle & DiaryProps) {
    return (
        <div>
            <h1 className="header-2">Diary</h1>
            <Search buttonName="New Entry" entryLen={props.entryLen} setOpened={props.setOpened} addEntry= {props.addEntry} changeEntry={props.changeEntry} setIdx={props.setIdx} deleteEntry={props.deleteEntry}/>
            {props.entriesArr.map((entry: DiaryEntry) => (
                <CondensedEntry key={entry.id} {...entry} setOpened={props.setOpened} changeEntry={props.changeEntry} addEntry={props.addEntry} entryLen={props.entryLen} setIdx={props.setIdx} deleteEntry={props.deleteEntry}/>
            ))}
        </div>
    )
}

function CondensedEntry(props: ToggleBundle & DiaryEntry) {
    const { setDiaryIdx } = useContext(DiaryIdx)!;
    let editEntry = () => {
        setDiaryIdx(props.arrIdx);
        props.setOpened(true);
    }
    return (
        <div>
            <div className="entry-box-condensed">
                <div className="c-date">{props.date}</div>
                <div className="c-middle">
                    <div className="c-title">{props.title}</div>
                    <div className="c-buttons"> 
                        <button className="edit-entry" onClick={editEntry}><u>Edit</u></button>
                        <button className="delete-entry" onClick={() => props.deleteEntry(props.id)}><u>Delete</u></button>
                    </div> 
                </div>
            </div>
        </div>
    )
}