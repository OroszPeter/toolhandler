import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import * as table from '$lib/server/db/schema';

// A szerver oldalon frissítjük a kölcsönzött eszközöket
export const load = async () => {
    const tools = await db
        .select({
            id: table.tools.id,
            title: table.tools.title,
            description: table.tools.description,
            user_name: table.user.name, // Az eszközhöz tartozó felhasználó neve
        })
        .from(table.tools)
        .leftJoin(table.user, eq(table.tools.user_id, table.user.id)); // JOIN az user táblával

    return { tools };
};

export const actions = {
    rent: async ({ request, locals }) => {
        if (!locals.user) {
            return { error: 'Be kell jelentkezni a kölcsönzéshez!' };
        }

        const formData = await request.formData();
        const toolId = formData.get('tool_id');

        // Eszköz kölcsönzése: frissítjük a user_id-t
        await db.update(table.tools)
            .set({ user_id: locals.user.id })
            .where(eq(table.tools.id, toolId)); // Kölcsönzéshez szükséges eszköz frissítése

        // Frissített eszközök lekérdezése, hogy az új tulajdonos adatai is megjelenjenek
        const tools = await db
            .select({
                id: table.tools.id,
                title: table.tools.title,
                description: table.tools.description,
                user_name: table.user.name, // Az új tulajdonos neve
            })
            .from(table.tools)
            .leftJoin(table.user, eq(table.tools.user_id, table.user.id));

        return { success: 'Eszköz kölcsönzése sikeres!', tools }; // Az új eszközkészletet küldjük vissza
    }
};
