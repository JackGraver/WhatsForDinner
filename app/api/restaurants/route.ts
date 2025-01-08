import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "data", "wfd.db");

const db = new Database(dbPath);

export async function GET() {
	try {
		const rows = db.prepare(
			`SELECT 
    			r.restaurant_id,
    			r.restaurant_name,
    			last_visit,
				rating,
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

export async function POST(request: Request) {
	try {
		const newRestaurant = await request.json();

		console.log(newRestaurant)

		let stmt = db.prepare(
			`INSERT INTO restaurant (restaurant_name, last_visit, rating) 
			VALUES (?, ?, ?);`
		)

		const result = stmt.run(newRestaurant.restaurant_name, newRestaurant.last_visit, newRestaurant.rating)
		const newID = result.lastInsertRowid;

		if (result.changes == 0) {
			return NextResponse.json(
				{ error: "Strat not found or no changes made" },
				{ status: 404 }
			);
		}

		stmt = db.prepare(
			`INSERT INTO restaurant_category (restaurant_id, category_id) 
			VALUES (?, ?);`
		);

		let changesCount = 0;  // Counter for changes

		newRestaurant.categories_id.forEach((categoryId: number) => {
			const result = stmt.run(newID, categoryId);
			if (result.changes > 0) {
				changesCount++;
			}
		});

		if (changesCount === 0) {
			return NextResponse.json(
				{ error: "No categories were added to the restaurant" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ success: true, restaurant: newRestaurant });

	} catch (error) {
		console.error("Error during update:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}


export async function PUT(request: Request) {
	try {
		const updatedRestaurant = await request.json();

		if (!updatedRestaurant.restaurant_id) {
			return NextResponse.json(
				{ error: "ID is required for update" },
				{ status: 400 }
			);
		}

		const stmt = db.prepare(
			`UPDATE restaurant SET restaurant_name = ?, rating = ?, last_visit = ? 
			WHERE restaurant_id = ?`
		)

		const result = stmt.run(updatedRestaurant.restaurant_name, updatedRestaurant.rating, updatedRestaurant.last_visit, updatedRestaurant.restaurant_id);

		if (result.changes == 0) {
			return NextResponse.json(
				{ error: "Strat not found or no changes made" },
				{ status: 404 }
			);
		}
		return NextResponse.json({ success: true, restaurant: updatedRestaurant });

	} catch (error) {
		console.error("Error during update:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

export async function DELETE(request: Request) {
	try {
		const { restaurant_id } = await request.json();

		if (!restaurant_id) {
			return NextResponse.json(
				{ error: "ID is required for update" },
				{ status: 400 }
			);
		}

		const stmt = db.prepare(
			`DELETE FROM restaurant WHERE category_id = ?`
		)

		const result = stmt.run(restaurant_id);

		if (result.changes == 0) {
			return NextResponse.json(
				{ error: "Strat not found or no changes made" },
				{ status: 404 }
			);
		}
		return NextResponse.json({ success: true, restaurant_id });

	} catch (error) {
		console.error("Error during update:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}