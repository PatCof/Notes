import { AnimatePresence, motion } from "motion/react";
import ExitIcon from "../assets/x.svg";

type ModalProperties = {
    closeModal: () => void;
    deleteModal: (id:number)=> void;
    Id: number;
}


export default function DeleteModal({closeModal, deleteModal, Id}:ModalProperties){
    return(
        <>
            <div className="bg-[rgba(0,0,0,0.5)] fixed flex justify-center items-center top-0 left-0 w-screen h-screen z-10">
            <AnimatePresence >
                    <motion.div 
                    initial={{ opacity:0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{opacity:0, scale:0 }}
                    transition={{
                        duration: 0.5,
                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                  }}
                    key="ModalID"
                    className="flex flex-col bg-sky-50 w-125 h-50 p-5 rounded-xl ">
                        <div className="flex justify-between h-50 border-b  items-center text-4xl">
                            <h1>Delete Note: [TITLE]</h1> {/*change title to be dynamic*/}
                            <button onClick={closeModal} className="h-8 w-8 flex justify-center"><img src={ExitIcon}></img></button>
                        </div>
                        <div className="h-[60%] mt-5 mb-5">
                            <p className="text-xl">Are you sure you want to delete the Note?</p>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={() => deleteModal(Id)} className=" h-10 w-20 bg-red-400 rounded-xl">Delete</button>
                            <button onClick={closeModal} className="h-10 w-20 ml-5 bg-gray-400 rounded-xl">Cancel</button>
                        </div>
                    </motion.div>
            </AnimatePresence>
            </div>

        </>
    );


}