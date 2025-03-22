<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';

	async function handleGoogle() {
		const ret = await signIn('credentials', {
			email: 'test@example.com',
			password: 'password123',
			redirect: false
		});
		console.log({ ret });
	}
</script>

<div class="flex h-full w-full items-center justify-center">
	<div class="w-84 flex flex-col gap-7">
		<div class="text-center text-3xl font-medium">Login</div>
		<div class="flex flex-col gap-1">
			<label for="email" class=""
				>Email

				<span class="text-red-500">*</span>
			</label>
			<input id="email" type="email" class="rounded-[5px] border border-gray-400 p-2" />
		</div>
		<div class="flex flex-col gap-1">
			<label for="password" class=""
				>Password

				<span class="text-red-500">*</span>
			</label>
			<input id="password" type="password" class="rounded-[5px] border border-gray-400 p-2" />
		</div>
		<button
			aria-label="login"
			type="button"
			class="cursor-pointer rounded-[5px] bg-blue-600 py-2 text-white hover:bg-blue-800"
			>Login</button
		>
		<div class="flex items-center justify-center gap-2">
			<span>Don't have an account?</span>
			<a href="/signup" class="text-blue-600 hover:text-blue-800">Sign Up</a>
		</div>
		<div class="relative">
			<div class="absolute inset-0 flex items-center" aria-hidden="true">
				<div class="w-full border-t border-gray-300"></div>
			</div>
			<div class="relative flex justify-center">
				<span class="bg-white px-2 text-sm text-gray-500">OR</span>
			</div>
		</div>
		<button
			onclick={handleGoogle}
			aria-label="google"
			type="button"
			class="flex cursor-pointer items-center justify-center gap-2 rounded-[5px] border border-gray-400 p-2 hover:bg-gray-100"
		>
			<iconify-icon icon="devicon:google"></iconify-icon>
			Continue with Google
		</button>
	</div>
</div>
