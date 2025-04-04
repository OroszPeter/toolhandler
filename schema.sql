-- Create user table
CREATE TABLE IF NOT EXISTS "user" (
    id TEXT PRIMARY KEY,
    name TEXT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);

-- Create session table
CREATE TABLE IF NOT EXISTS session (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES "user"(id),
    expires_at TIMESTAMP NOT NULL
);

-- Create tools table
CREATE TABLE IF NOT EXISTS tools (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    serialnum TEXT NOT NULL,
    user_id TEXT NOT NULL REFERENCES "user"(id)
); 