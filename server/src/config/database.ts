// src/config/database.ts
import Database from 'better-sqlite3';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const DB_PATH = process.env.DB_PATH || './database.sqlite';

// Create a new database connection
const db = new Database(DB_PATH, { verbose: console.log });

// Create snippets table if it doesn't exist
const createTables = () => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS snippets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      language TEXT DEFAULT 'html',
      theme TEXT DEFAULT 'vs-dark',
      shareId TEXT UNIQUE NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_share_id ON snippets(shareId);
  `;

  db.exec(createTableSQL);
};

// Initialize the database
createTables();

export default db;