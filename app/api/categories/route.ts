import { NextResponse } from "next/server";
import Database from "better-sqlite3";

const dbPath = "C:/Users/Jack/Desktop/whatsfordinner/whatsfordinner-app/data/wfd.db"

const db = new Database(dbPath);

export async function GET() {
    try {
        const rows = db.prepare(
            `SELECT * 
                FROM category;`
        ).all();

        return NextResponse.json(rows);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch data from the database" },
            { status: 500 }
        );
    }
}