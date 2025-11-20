import TrashIcon from "../assets/trash-2.svg";
import {useState, type ChangeEvent} from "react";
import * as motion from "motion/react-client"
import DeleteModal from '../components/DeleteModal';
import { AnimatePresence } from "motion/react";
import CheckIcon from "../assets/check.svg";
import CancelIcon from "../assets/x.svg";
import EditIcon from "../assets/square-pen.svg";

export type Notes = {
  id: number;
  title: string;
  subtext: string;
}


type NoteText = {
    deleteNote:(id:number) => void;
    editNote: (id: number, title: string, subtext: string) => void;
    note: Notes;
}


export default function Note({deleteNote, editNote, note}: NoteText){
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [titleInput, setTitleInput] = useState<string>(note.title);
  const [subtextInput, setSubtextInput] = useState<string>(note.subtext);


  function closeModal(){
    setShowDeleteModal(false);
  }

  function onDelete(){
    setShowDeleteModal(true);
  }


  function cancelEdit(){
    if(isEditing){
        setTitleInput('');
        setSubtextInput('');
        setIsEditing(false);
    };
  }
  function triggerEdit(){
    if(!isEditing){ 
      setTitleInput(note.title);
      setSubtextInput(note.subtext);
      setIsEditing(true);
    }
  }

  function setTitle(event : ChangeEvent<HTMLInputElement>){
    if (event) setTitleInput(event.target.value);
    if (event) console.log(titleInput);

  }

  function setSubtext(event: ChangeEvent<HTMLInputElement>){
    if (event) setSubtextInput(event.target.value);
  }



    return(
        <>
        {showDeleteModal && <DeleteModal Id={note.id} deleteModal={() => deleteNote(note.id)} closeModal={closeModal}></DeleteModal>}
            <div className="relative bg-stone-100 h-70 w-50 rounded-2xl shadow-xl/30 wrap-break-word  mt-10">
                <div className="flex justify-center font-bold">
                    {isEditing ?
                        <input value={titleInput} onChange={setTitle} type="text" className="mt-2 text-2xl w-50 text-center" placeholder={note.title}></input>
                        :
                        <h1 className="mt-2 text-2xl underline">{note.title}</h1>
                    }
                </div>
                <div>
                    {isEditing ?
                        <input value={subtextInput} onChange={setSubtext} type="text" className="m-3 text-md w-45" placeholder={note.subtext}></input>
                        :
                        <p className="m-3 text-md">{note.subtext}</p>
                    }
                </div>
                
                <div className="absolute bottom-0 right-0 translate-5">            
                    {isEditing ?
                        <div>
                            <button onClick={cancelEdit} className="bg-red-400 rounded-full p-3 h-10 w-10"><img src={CancelIcon}></img></button>
                            <button onClick={()=> {editNote(note.id, note.title, note.subtext); 
                                                            setIsEditing(false);}}
                              className="bg-green-400 rounded-full p-3 h-10 w-10"><img src={CheckIcon}></img></button>
                        </div>
                        :
                        <div>
                            <button onClick={triggerEdit} className="bg-sky-200 rounded-full p-3 h-10 w-10"><img src={EditIcon}></img></button>
                            <button onClick={onDelete} className="bg-amber-200 rounded-full p-3 h-10 w-10"><img src={TrashIcon}></img></button>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}