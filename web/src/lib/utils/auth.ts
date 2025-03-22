import { SvelteKitAuth } from '@auth/sveltekit';
import CredentialsProvider from '@auth/sveltekit/providers/credentials';
import GoogleProvider from '@auth/sveltekit/providers/google';
export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		GoogleProvider({
			clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
			clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code'
				}
			}
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {},
				password: {}
			},
			async authorize(credentials): Promise<any> {
				const { email, password } = credentials as {
					email: string;
					password: string;
				};
				console.log({ email, password });
				return new Promise(async (resolve, reject) => {
					if (email === 'test@example.com' && password === 'password123') {
						resolve({ id: '1', email, role: 'user' });
					}
					reject('Invalid credentials');

					// try {
					// 	const user = await loginUser(email, password);
					// 	if (!user.success) {
					// 		reject(user.message || 'Invalid credentials');
					// 		return;
					// 	}
					// 	// console.log(user)
					// 	resolve(user.data);
					// } catch (error) {
					// 	reject(error);
					// }
				});
			}
		})
	],
	session: {
		strategy: 'jwt',
		maxAge: 6 * 60 * 60
		// maxAge: 60
	},
	callbacks: {
		async jwt({ token, user }: any) {
			if (user) {
				//@ts-ignore
				token.accessToken = user.accessToken;
				//@ts-ignore
				token.hasResetPassword = user.hasOwnProperty('hasResetPassword')
					? user.hasResetPassword
					: true;
				token.user = user;

				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) {
			//@ts-ignore
			session.accessToken = token.accessToken;
			//@ts-ignore
			session.hasResetPassword = token.hasResetPassword;
			//@ts-ignore
			session.user = token.user;
			//@ts-ignore

			session.role = token.role;

			return session;
		}
	},
	secret: import.meta.env.VITE_AUTH_SECRET,
	debug: process.env.NODE_ENV == 'development',
	trustHost: true,

	pages: {
		signIn: '/login',
		error: '/login'
	}
});
