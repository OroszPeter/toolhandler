import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import * as table from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    if (!locals.user) {
            throw redirect(302, '/demo/lucia/login'); // Ha nincs bejelentkezve, irányítsd át a login oldalra
        }
        return { user: locals.user };

    const tools = await db
        .select()
        .from(table.tools)
        .where(eq(table.tools.user_id, locals.user.id));

    return { tools };
};
