import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
    id: text('id').primaryKey(),
    name: text('name'),
    username: text('username').notNull().unique(),
    passwordHash: text('password_hash').notNull()
})

export const session = pgTable("session", {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => user.id),
    expiresAt: timestamp('expires_at').notNull()
})

export const tools = pgTable("tools", {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    image: text('image').notNull(),
    serialnum: text('serialnum').notNull(),
    user_id: text('user_id').notNull().references(() => user.id),
})