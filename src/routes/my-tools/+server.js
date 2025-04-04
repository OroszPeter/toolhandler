import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import * as table from '$lib/server/db/schema';

// GET kérés kezelése: lekérdezzük az eszközöket
export const GET = async ({ locals }) => {
    if (!locals.user) return new Response(JSON.stringify({ tools: [] }), { status: 200 });

    const tools = await db
        .select()
        .from(table.tools)
        .where(eq(table.tools.user_id, locals.user.id));

    return new Response(JSON.stringify({ tools }), { status: 200 });
};

// PUT kérés kezelése: eszköz szerkesztése vagy visszaadása
export const PUT = async ({ request, locals }) => {
    const { id, title, description, return: isReturning } = await request.json();

    if (!locals.user) return new Response('Nincs jogosultság.', { status: 401 });

    if (isReturning) {
        // Eszköz visszaadása: user_id nullázása
        await db.update(table.tools)
            .set({ user_id: null })
            .where(eq(table.tools.id, id));
    } else {
        // Eszköz szerkesztése
        await db.update(table.tools)
            .set({ title, description })
            .where(eq(table.tools.id, id));
    }

    return new Response('OK', { status: 200 });
};

// DELETE kérés kezelése: eszköz törlése
export const DELETE = async ({ request, locals }) => {
    const { id } = await request.json();
    if (!locals.user) return new Response('Nincs jogosultság.', { status: 401 });

    await db.delete(table.tools).where(eq(table.tools.id, id));

    return new Response('OK', { status: 200 });
};
