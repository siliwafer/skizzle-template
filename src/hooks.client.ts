import { initializeClerkClient } from 'clerk-sveltekit/headless';
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
import { signInUrl, signUpUrl } from '$lib';

initializeClerkClient(PUBLIC_CLERK_PUBLISHABLE_KEY, {
	afterSignInUrl: '/account',
	afterSignUpUrl: '/account',
	signInUrl,
	signUpUrl
});
