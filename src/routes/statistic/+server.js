import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import { tools, user } from '$lib/server/db/schema';
import { count, desc, eq } from 'drizzle-orm'; // Eq importálása INNEN!

export async function GET() {
    // Lekérdezzük a felhasználókhoz tartozó eszközök számát
    const toolCounts = await db
        .select({
            user_name: user.name,
            tool_count: count(tools.id).as('count')
        })
        .from(user)
        .leftJoin(tools, eq(user.id, tools.user_id))
        .groupBy(user.id)
        .orderBy(desc('count')); // HELYES: A 'count' alias nevet használjuk a rendezéshez!

    return json(toolCounts);
}
