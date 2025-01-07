import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "data", "wfd.db");

const db = new Database(dbPath);

export async function GET() {
    try {
        const rows = db.prepare(
            `SELECT 
                category.category_id,
                category.category_name,
                COUNT(restaurant_category.restaurant_id) AS num_restaurants
            FROM 
                category
            LEFT JOIN 
                restaurant_category ON category.category_id = restaurant_category.category_id
            GROUP BY 
                category.category_id, category.category_name;`
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

export async function PUT(request: Request) {
    try {
        const updatedCategory = await request.json();

        if (!updatedCategory.category_id) {
            return NextResponse.json(
                { error: "ID is required for update" },
                { status: 400 }
            );
        }

        const stmt = db.prepare(
            `UPDATE category SET category_name = ? WHERE category_id = ?`
        )

        const result = stmt.run(updatedCategory.category_name, updatedCategory.category_id);

        if (result.changes == 0) {
            return NextResponse.json(
                { error: "Strat not found or no changes made" },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, strat: updatedCategory });

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
        const { category_id } = await request.json();

        if (!category_id) {
            return NextResponse.json(
                { error: "ID is required for update" },
                { status: 400 }
            );
        }

        const stmt = db.prepare(
            `DELETE FROM category WHERE category_id = ?`
        )

        const result = stmt.run(category_id);

        if (result.changes == 0) {
            return NextResponse.json(
                { error: "Strat not found or no changes made" },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, category_id });

    } catch (error) {
        console.error("Error during update:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}