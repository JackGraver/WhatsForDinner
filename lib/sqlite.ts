// src/lib/sqlite.ts
import Database from 'better-sqlite3';
import path from 'path';

// Resolve the path to database.db in the 'data' folder
const dbPath = path.resolve('data', 'wfd.db');
const db = new Database(dbPath, { verbose: console.log });

export default db;
