import { drizzle } from 'drizzle-orm/neon-http';
const connectionString = process.env.DATABASE_URL!;
export const db = drizzle(connectionString);