import { dev } from '$app/environment';
import { PUBLIC_CLERK_DEV_DOMAIN, PUBLIC_CLERK_PROD_DOMAIN } from '$env/static/public';

const baseAuthUrl = dev ? PUBLIC_CLERK_DEV_DOMAIN : PUBLIC_CLERK_PROD_DOMAIN;

export const signInUrl = baseAuthUrl + '/sign-in';
export const signUpUrl = baseAuthUrl + '/sign-up';
export const createSignInWithRedirectUrl = (redirectTo: string) =>
	`${signInUrl}?redirectUrl=${redirectTo}`;
