import { useState, type ChangeEvent, type MouseEvent} from 'react';
import './App.css';
import NotebookIcon from "./assets/notebook-pen.svg";
import CheckIcon from "./assets/check.svg";
import CancelIcon from "./assets/x.svg";
import Note from "./components/Note";
import DeleteModal from './components/DeleteModal';
type Notes = {
  id: number;
  title: string;
  subtext: string;
}

function App() {
  const [titleInput, setTitleInput] = useState("");
  const [insertInput, setInsertInput] = useState("");
  const [notes, setNotes] = useState<Notes[]>([]);
  const [count, setCount] = useState<number>(0);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);


  const [showCRUDToggle, setShowCRUDToggle] = useState<boolean>(false);
  const [showNoteToggle, setShowNoteToggle] = useState<boolean>(true);

  function closeModal(){
    setShowDeleteModal(false);
  }

  function onDelete(){
    setShowDeleteModal(true);
  }

  function addNote(event: MouseEvent<HTMLButtonElement>){
    event.preventDefault();
    const newNote: Notes = {
      id: count,
      title: titleInput,
      subtext:insertInput,
    }
    setNotes([...notes, newNote]);
    setCount(count+1);
      if(showCRUDToggle && !showNoteToggle){
        setShowNoteToggle(true);
        setShowCRUDToggle(false);
        setTitleInput("");
        setInsertInput("");
    }

  }

  function deleteNote(id:number){


  }

  function cancelNote(event: MouseEvent<HTMLButtonElement>){
    event.preventDefault();
    if(showCRUDToggle && !showNoteToggle){
      setShowNoteToggle(true);
      setShowCRUDToggle(false);
    }
  }

  function setTitle(event:ChangeEvent<HTMLInputElement>){
    if(event){
      setTitleInput(event.target.value);
    }  
  }

  function setNote(event:ChangeEvent<HTMLTextAreaElement>){
    if(event){
      setInsertInput(event.target.value);
    }  
  }

  function showCRUD(){
    if(!showCRUDToggle && showNoteToggle){
      setShowNoteToggle(false);
      setShowCRUDToggle(true);
      setTitleInput("");
      setInsertInput("");
    }
  }

  return (
    <>
        {showDeleteModal && <DeleteModal deleteModal={() => deleteNote(item.id)} closeModal={closeModal}></DeleteModal>}


      {/* HEADER */}
      <div className="bg-sky-500 h-12 w-full">
        <div className="flex flex-row justify-start items-center pl-2">
          <img src={NotebookIcon} className="h-8 w-8"></img><h1 className="pl-2 font-marker font-bold text-[2rem]">NOTIFY</h1>

        </div>
            <div className="w-full flex justify-center translate-y-[-125%]">
              <input placeholder="Search...." className="bg-[url('./assets/search.svg')] rounded-lg border-2 border-sky-700 bg-right bg-no-repeat bg-sky-50 w-200 h-8 text-lg pl-2 pr-6">
            </input>
        </div>
      </div>
      
      {/* BODY */}
      <div>
        <div  className="flex justify-center mt-10">
            { showNoteToggle &&
              <div>
                <input onClick={showCRUD} placeholder="Take Notes...." className="rounded-lg border-2 border-sky-700 bg-sky-50 w-150 h-8 text-lg pl-2 pr-6"> 
                </input>
              </div>
            }

            { showCRUDToggle &&
            <div className="none w-150 bg-sky-50 rounded">
              <input value={titleInput} onChange={setTitle}  placeholder="Title" className="active:border-b focus:border-b border-b-slate-500 hover:border-b focus:outline-none w-142 h-10 text-lg ml-4 mt-4"> 
              </input>
              <textarea value={insertInput} onChange={setNote} rows={3} placeholder="Take Notes..." className="focus:border-b border-b-slate-500 hover:border-b  focus:outline-none text-lg mt-5 ml-4 w-142"> 
              </textarea>
              <div className="flex justify-end h-5  translate-x-5">
                <button onClick={cancelNote} className="bg-red-400 rounded-full p-3 h-10 w-10"><img src={CancelIcon}></img></button>
                <button onClick={addNote} className="bg-green-400 rounded-full p-3 h-10 w-10"><img src={CheckIcon}></img></button>
              </div>
          </div>
            }

        </div>

      {/* NOTES */}
        <div className="flex justify-center mb-10">
            <div className="grid grid-cols-5 gap-5">
              {notes && notes.map(item =>(
                <Note Title={item.title} Subtext={item.subtext} key={item.id} onDelete={onDelete}></Note>
              ))}
            </div>
          </div>
        </div>
    </>
  )
}

export default App
