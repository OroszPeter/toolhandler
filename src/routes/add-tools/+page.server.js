import { db } from '$lib/server/db';
import { tools } from '$lib/server/db/schema';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(302, '/demo/lucia/login'); // Ha nincs bejelentkezve, irányítsd át a login oldalra
    }
    return { user: locals.user };
};


export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const title = formData.get('title');
        const description = formData.get('description');
        const serialnum = formData.get('serialnum');
        const user_id = formData.get('user_id');
        const image = "image";

        console.log('Received form data:', { title, description, image, serialnum, user_id });

        if (!title || !description || !serialnum || !user_id) {
            console.error('Hiba: Minden mezőt ki kell tölteni!');
            return { error: 'Minden mező kitöltése kötelező!' };
        }

        try {
            await db.insert(tools).values({
                id: uuidv4(),
                title,
                description,
                image,
                serialnum,
                user_id
            });

            console.log('Eszköz sikeresen hozzáadva az adatbázishoz.');

            return { success: true };
        } catch (error) {
            console.error('Hiba az adatbázis beszúrás során:', error);
            return { error: 'Hiba történt az eszköz hozzáadása közben!' };
        }
    }
};
