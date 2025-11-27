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
  const [pendingDelete, setPendingDelete] = useState<number | null>(null);
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
    const newValue = event.target.value;
    console.log(newValue);
    if (event) setTitleInput(newValue);
  }

  function setSubtext(event: ChangeEvent<HTMLInputElement>){
    if (event) setSubtextInput(event.target.value);
  }

  function confirmDelete(){
    setPendingDelete(note.id);
    setShowDeleteModal(false);
  }

    return(
        <>
        <AnimatePresence onExitComplete={() => {if(pendingDelete) deleteNote(pendingDelete); setPendingDelete(null);}}>
        {showDeleteModal && <DeleteModal Id={note.id}  deleteModal={confirmDelete} closeModal={closeModal}></DeleteModal>}
        </AnimatePresence>
        <motion.div 
                    initial={{ opacity:0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{opacity:0, scale:0 }}
                    transition={{
                        duration: 0.2,
                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                  }}
                  key={note.id}
                  >
            <div className="relative bg-stone-100 h-70 w-50 rounded-2xl shadow-xl/30 wrap-break-word  mt-10">
            <form>
                <div className="flex justify-center font-bold">
                    {isEditing ?
                        <input required value={titleInput} onChange={setTitle} type="text" className="mt-2 text-2xl w-50 text-center" placeholder={note.title}></input>
                        :
                        <h1 className="mt-2 text-2xl underline">{note.title}</h1>
                    }
                </div>
                <div>
                    {isEditing ?
                        <input required value={subtextInput} onChange={setSubtext} type="text" className="m-3 text-md w-45" placeholder={note.subtext}></input>
                        :
                        <p className="m-3 text-md">{note.subtext}</p>
                    }
                </div>
              </form>
                <div className="absolute bottom-0 right-0 translate-5">            
                    {isEditing ?
                        <div>
                            <button onClick={cancelEdit} className="bg-red-400 rounded-full p-3 h-10 w-10"><img src={CancelIcon}></img></button>
                            <button onClick={()=> {editNote(note.id, titleInput, subtextInput); 
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
          </motion.div>
        </>
    )
}