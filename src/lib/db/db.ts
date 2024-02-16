import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { POSTGRES_URL } from '$env/static/private';
import { dev } from '$app/environment';

const client = dev ? postgres(POSTGRES_URL) : postgres(POSTGRES_URL, { ssl: 'require' });
export const db = drizzle(client);
