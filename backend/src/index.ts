import express, {Request, Response} from 'express';
import {initDB} from './database';
import {createDB, createNote, updateNote, getNotes, deleteNote, getLatestNote} from './notes.model';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());


interface Note{
    title: string,
    subtext: string,
    id: number,
    position: number 
}

async function startServer(){
    await initDB();
    await createDB();
    app.listen(port, ()=>{
        console.log(`Server is running on ${port}`);
    });
}
app.get("/notes", async function(req:Request, res:Response){
    try{
        const allNotes = await getNotes();
        res.status(200).send(allNotes);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Failed to fetch notes" });
    }
})

app.post("/addNotes", async function(req: Request, res:Response){
    try{
        //title, subtext, position
        const latestNote = await getLatestNote();
        const newID = latestNote.id ? latestNote.id + 1 : 0;
        await createNote(req.body.title, req.body.subtext, newID);

        res.status(201).json({
            id: newID,
            title: req.body.title,
            subtext: req.body.subtext,
            key: newID 
        });

    }catch(error){
        console.error(error);
        res.status(500).json({error: "Failed to create a Note"});
    }
});

app.delete('/deleteNotes/:id', async function(req: Request, res: Response){
    try{
        const id = parseInt(req.params.id);
        await deleteNote(id);
        res.status(200).json({message:"Successfully deleted a Note", id});
    }catch (error){
        console.error(error);
        res.status(500).json({error: "Failed to delete a Note"});
    }
});

app.patch('/editNotes', async function(req: Request, res:Response){
    try{
        const title = req.body.title;
        const subtext = req.body.subtext;
        const id = Number(req.body.id);
        const updated = await updateNote(title, subtext, id);
        console.log("SERVER BODY:", req.body);

        res.json(updated);
    }catch(error){
        console.error(error);
        res.status(500).json({error:"Failed to update a Note"});
    }
});

startServer();