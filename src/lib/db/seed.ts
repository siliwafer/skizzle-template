import { Worker, isMainThread, workerData, parentPort } from 'worker_threads';
import * as os from 'os';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import 'dotenv/config';
import { user } from './schema';

const sql = postgres(process.env.POSTGRES_URL!, { max: 1 });
const db = drizzle(sql);

let seeds = [];

const TOTAL_SEEDS = 100;
const NUM_WORKERS = os.cpus().length;

if (isMainThread) {
	async function main() {
		const batchSize = Math.ceil(TOTAL_SEEDS / NUM_WORKERS);

		for (let i = 0; i < NUM_WORKERS; i++) {
			const start = i * batchSize;
			const end = (i + 1) * batchSize;

			const worker = new Worker(__filename, { workerData: { start, end } });

			worker.on('message', (message) => {
				console.log(message);
			});

			worker.on('error', (error) => {
				console.error(`Worker ${i} encountered an error: ${error}`);
			});
		}
	}

	main().catch(console.error);
} else {
	const { start, end } = workerData;

	parentPort?.postMessage(`Seeding range ${start} <-> ${end}`);

	for (let i = 0; i < end - start; i++) {
		let user_seed = await db.insert(user).values({
			name: 'Johnny Appleseed'
		});

		seeds.push(user_seed);
	}
}

await Promise.all(seeds);

await sql.end();
