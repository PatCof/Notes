import { getDB } from "./database";


export async function createDB(){
    const db = getDB();
    await db.exec('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL ,title TEXT, subtext TEXT, position INT UNIQUE NOT NULL)');
}

export async function createNote(title: string, subtext: string, position: number){
    const db = getDB();
    await db.run('INSERT INTO notes (title, subtext, position) VALUES (?,?,?)', [title, subtext, position]);
}

export async function updateNote(title: string, subtext: string, id: number){
    const db = getDB();
    await db.run('UPDATE notes SET title = ?, subtext = ? WHERE id= ?', [title, subtext, id]);
    return await db.get('SELECT * FROM notes WHERE id = ?', id);

}

export async function getNotes(){
    const db = getDB();
    return await db.all('SELECT * FROM notes');
}

export async function getLatestNote(){
    const db = getDB();
    return await db.get(`SELECT * FROM notes 
                        ORDER BY id DESC 
                        LIMIT 1`);
}


export async function deleteNote(id: number){
    const db = getDB();
    await db.run('DELETE FROM notes WHERE id=?', id);
}

export async function getSelectedNotes(substring: string){
    const db = getDB();
    const search = `%${substring}%`;
    return await db.all('SELECT * FROM notes WHERE title LIKE ? OR subtext LIKE ?', [search, search]);
}


