import TrashIcon from "../assets/trash-2.svg";
import {type MouseEventHandler} from "react";
import * as motion from "motion/react-client"

type NoteText = {
    Title: string;
    Subtext: string;
    onDelete: MouseEventHandler;
}


export default function Note({Title, Subtext, onDelete}: NoteText){

    return(
        <>
            <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.4,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            
            className="relative bg-stone-100 h-70 w-50 rounded-2xl shadow-xl/30 wrap-break-word  mt-10">
                <div className="flex justify-center font-bold">
                    <h1 className="mt-2 text-2xl underline">{Title}</h1>
                </div>
                <div>
                    <p className="m-3 text-md">{Subtext}</p>
                </div>
                
                <div className="absolute bottom-0 right-0 translate-5">            
                    <button onClick={onDelete} className="bg-amber-200 rounded-full p-3 h-10 w-10"><img src={TrashIcon}></img></button>
                </div>
            </motion.div>
        </>
    )
}