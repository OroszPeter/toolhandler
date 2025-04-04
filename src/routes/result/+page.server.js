import { db } from '$lib/server/db';
import { eq, like } from 'drizzle-orm'; // használjuk a like operátort
import * as table from '$lib/server/db/schema';

export const load = async ({ url }) => {
    const searchQuery = url.searchParams.get('search') || ''; // Keresési paraméter lekérése

    // Alapértelmezett lekérdezés
    let toolsQuery = db
        .select({
            id: table.tools.id,
            title: table.tools.title,
            description: table.tools.description,
            user_name: table.user.name, // Felhasználó neve
        })
        .from(table.tools)
        .leftJoin(table.user, eq(table.tools.user_id, table.user.id));

    // Ha van keresési kifejezés, akkor alkalmazzuk a szűrést
    if (searchQuery) {
        toolsQuery = toolsQuery.where(
            like(table.tools.title, `%${searchQuery}%`) // Keresés a cím alapján
        );
    }

    const tools = await toolsQuery; // Lekérdezzük az eszközöket a szűrt feltételekkel

    return { tools }; // JSON válasz a frontendnek
};
