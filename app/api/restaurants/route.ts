import { NextResponse } from "next/server";
import Database from "better-sqlite3";

const dbPath = "C:/Users/Jack/Desktop/whatsfordinner/whatsfordinner-app/data/wfd.db"

const db = new Database(dbPath);

export async function GET() {
	try {
		const rows = db.prepare(
			`SELECT 
    			r.restaurant_id,
    			r.restaurant_name,
    			last_visit,
				GROUP_CONCAT(c.category_id, ', ') AS categories_id,
    			GROUP_CONCAT(c.category_name, ', ') AS categories
			FROM 
    			restaurant r
			JOIN 
    			restaurant_category rc ON r.restaurant_id = rc.restaurant_id
			JOIN 
    			category c ON rc.category_id = c.category_id
			GROUP BY 
    			r.restaurant_id, r.restaurant_name;`
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