import type { Handle } from '@sveltejs/kit';
import { handle as authenticationHandle } from './lib/utils/auth';
import { sequence } from '@sveltejs/kit/hooks';

async function authorizationHandle({ event, resolve }: any) {
	const adminAuthenticatedPath = event.route.id?.split('/')[2] === '(private)';
	const adminAuthPath = event.route.id?.split('/')[2] === '(auth)';
	const clientAuthenticatedPath = event.route.id?.split('/')[1] === '(private)';
	const clientAuthPath = event.route.id?.split('/')[1] === '(auth)';

	const session = await event.locals.auth();

	// console.log('session', session);

	return resolve(event);
}

export const handle: Handle = sequence(authenticationHandle, authorizationHandle);
