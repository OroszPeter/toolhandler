import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '$env/dynamic/private'

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set')

// Postgres kliens létrehozása
const client = postgres(env.DATABASE_URL, {
    ssl: {
        rejectUnauthorized: false // Development környezetben hasznos
    },
    max: 1 // Kapcsolatok számának korlátozása
})

// Drizzle ORM inicializálása
export const db = drizzle(client)
