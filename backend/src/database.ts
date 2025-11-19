import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'

let db: Database | null = null; 

export async function initDB(){
    db = await open({
        filename: './src/db/database.db',
        driver: sqlite3.cached.Database
    });
    return db;
}

export function getDB(){
    if(!db) throw new Error("Database is not Initialized");
    return db;
}


