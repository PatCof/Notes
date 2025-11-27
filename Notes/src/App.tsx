import { useState, useEffect, type ChangeEvent, type MouseEvent, type FormEvent} from 'react';
import './App.css';
import NotebookIcon from "./assets/notebook-pen.svg";
import CheckIcon from "./assets/check.svg";
import CancelIcon from "./assets/x.svg";
import Note from "./components/Note";
import type {Notes} from "./components/Note";
import { AnimatePresence } from 'motion/react';

type newNote = {
  title: string,
  subtext: string
}

function App() {
  const [titleInput, setTitleInput] = useState("");
  const [insertInput, setInsertInput] = useState("");
  const [notes, setNotes] = useState<Notes[]>([]);
  const [showCRUDToggle, setShowCRUDToggle] = useState<boolean>(false);
  const [showNoteToggle, setShowNoteToggle] = useState<boolean>(true);
  const [error, setError] = useState<string>("Both Fields Must be Filled");
  const [searchInput, setSearchInput] = useState<string>("");


  useEffect(()=>{
    async function showNotes(){
      const url = 'http://localhost:3000/notes';
      try{
        const response = await fetch(url);
        if(!response.ok){
          throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        setNotes(data);

      }catch(error){
        console.error(error);
      }
    }
    
    showNotes();
  }, []);


  async function addNote(event: MouseEvent<HTMLButtonElement>){
    event.preventDefault();
    if (titleInput.trim().length > 0 && insertInput.trim().length > 0){
    const newNote: newNote = {
      title: titleInput,
      subtext: insertInput,
    }
    try{
      const response = await fetch("http://localhost:3000/addNotes", {
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote)
      });

      if(!response.ok){
          throw Error('Network Response was not OK');
        }

        const savedNotes : Notes = await response.json();
        setNotes(prev => [...prev, savedNotes]);

        if(showCRUDToggle && !showNoteToggle){
          setTitleInput("");
          setInsertInput("");
          setError("Both Fields Must be Filled");
          setShowNoteToggle(true);
          setShowCRUDToggle(false);
        }
    }catch(error){
        console.error("Error adding note:", error);
      };
    } 
  }

  async function deleteNote(id:number){
    try{
      await fetch(`http://localhost:3000/deleteNotes/${id}`, {
        method: "DELETE",
      });
    }catch(error){
      console.error("Error deleting note:", error);
    }
    setNotes(notes.filter(n => n.id !== id));
  }

  const editNote = async (id: number, title: string, subtext: string) => {
    try{
      const response = await fetch('http://localhost:3000/editNotes', {
        method: 'PATCH',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({id: id, title: title, subtext: subtext})
      });
      if(!response.ok){
        throw Error("Network Response was not OK");
      }
      const editedNotes = await response.json();
      console.log("Backend returned:", editedNotes);
      setNotes(prev => prev.map(n=> (n.id === editedNotes.id ? editedNotes : n)) 
      );

    }catch(error){
      console.error("Error editing note:", error);
    }
  }


  function cancelNote(event: MouseEvent<HTMLButtonElement>){
    event.preventDefault();
    if(showCRUDToggle && !showNoteToggle){
      setShowNoteToggle(true);
      setShowCRUDToggle(false);
    }
  }

  async function searchNotes(substring: string){
    try{
      const  url = new URL("http://localhost:3000/searchNotes");
      const searchparams =  new URLSearchParams({"substring": substring});

      url.search = searchparams.toString();
      const response = await fetch(url);
      
      if(!response.ok){
        throw Error("Network Response Error");
      }
      let selected = await response.json(); 

      setNotes(selected);

    }catch(error){
      console.error(error);
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

  function setInput(event: ChangeEvent<HTMLInputElement>){
    if(event){
      setSearchInput(event.target.value);
    }
  }
  

  
  return (
    <>


      {/* HEADER */}
      <div className="bg-sky-500 h-12 w-full">
        <div className="flex flex-row justify-start items-center pl-2">
          <img src={NotebookIcon} className="h-8 w-8"></img><h1 className="pl-2 font-marker font-bold text-[2rem]">NOTIFY</h1>

        </div>
            <div className="w-full flex justify-center translate-y-[-125%]">
              <input onChange={(e)=>{setInput(e); searchNotes(e.target.value)}} value={searchInput} placeholder="Search...." className="bg-[url('./assets/search.svg')] rounded-lg border-2 border-sky-700 bg-right bg-no-repeat bg-sky-50 w-200 h-8 text-lg pl-2 pr-6">
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
              <form method="post">
                <input required={true} value={titleInput} onChange={(e)=> {setTitle(e); 
                  if(e.target.value.trim().length > 0){ setError("")
                  }else{ setError("Both Fields Must be Filled")}  }}  
                  placeholder="Title" className="active:border-b focus:border-b border-b-slate-500 hover:border-b focus:outline-none w-142 h-10 text-lg ml-4 mt-4"> 
                </input>
                <textarea required={true} value={insertInput} onChange={(e)=> {setNote(e); if (e.target.value.trim().length > 0){ setError("")
                  }else{ setError("Both Fields Must be Filled")} }} rows={3} placeholder="Take Notes..." className="focus:border-b border-b-slate-500 hover:border-b  focus:outline-none text-lg mt-5 ml-4 w-142"> 
                </textarea>
                {error && 
                  <div className="text-red-700 flex justify-center">
                    {error}
                  </div>}
                <div className="flex justify-end h-5  translate-x-5">
                  <button onClick={cancelNote} className="bg-red-400 rounded-full p-3 h-10 w-10"><img src={CancelIcon}></img></button>
                  <button onClick={addNote} className="bg-green-400 rounded-full p-3 h-10 w-10"><img src={CheckIcon}></img></button>
                </div>
              </form>
          </div>
            }
        </div>


      {/* NOTES */}
        <div className="flex justify-center mb-10">
            <div className="grid grid-cols-5 gap-5">
            <AnimatePresence>       
              {notes && notes.map(item =>(                
                    <Note key={item.id} deleteNote={() => deleteNote(item.id)} editNote={editNote} note={item} ></Note>
              ))}
            </AnimatePresence>

            </div>
          </div>
        </div>
    </>
  )
}

export default App
