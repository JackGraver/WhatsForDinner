import { NextResponse } from "next/server";
import Database from "better-sqlite3";

const dbPath = "C:/Users/Jack/Desktop/whatsfordinner/whatsfordinner-app/data/wfd.db"

const db = new Database(dbPath);

export async function GET(request: Request) {
	try {
		const rows = db.prepare(
			`SELECT restaurant_id, 
                        restaurant_name, 
                        last_visit, 
                        r.category_id, 
                        category_name
                    FROM restaurant as r, category as c  
                WHERE r.category_id = c.category_id;`
		).all();

		console.log(rows);
		return NextResponse.json(rows);
	} catch (error) {
		console.error("Database error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch data from the database" },
			{ status: 500 }
		);
	}
}