import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
	driver: 'pg',
	schema: './src/lib/db/schema.ts',
	out: './drizzle',
	dbCredentials: {
		connectionString: process.env.POSTGRES_URL!
	}
} satisfies Config;
