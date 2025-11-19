import TrashIcon from "../assets/trash-2.svg";
import {useState} from "react";
import * as motion from "motion/react-client"
import DeleteModal from '../components/DeleteModal';
import { AnimatePresence } from "motion/react";

type NoteText = {
    Title: string;
    Subtext: string;
    deleteNote:(id:number) => void;
    Id: number;
}


export default function Note({Title, Subtext, deleteNote, Id}: NoteText){
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  function closeModal(){
    setShowDeleteModal(false);
  }

  function onDelete(){
    setShowDeleteModal(true);
  }


    return(
        <>
        {showDeleteModal && <DeleteModal Id={Id} deleteModal={() => deleteNote(Id)} closeModal={closeModal}></DeleteModal>}
            <div className="relative bg-stone-100 h-70 w-50 rounded-2xl shadow-xl/30 wrap-break-word  mt-10">
                <div className="flex justify-center font-bold">
                    <h1 className="mt-2 text-2xl underline">{Title}</h1>
                </div>
                <div>
                    <p className="m-3 text-md">{Subtext}</p>
                </div>
                
                <div className="absolute bottom-0 right-0 translate-5">            
                    <button onClick={onDelete} className="bg-amber-200 rounded-full p-3 h-10 w-10"><img src={TrashIcon}></img></button>
                </div>
            </div>
        </>
    )
}