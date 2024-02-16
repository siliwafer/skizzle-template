import { dev } from '$app/environment';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (dev) {
		console.log(locals.session);
	}

	return {};
}) satisfies LayoutServerLoad;
