import axios from 'axios';

const url = import.meta.env.VITE_SERVER_URL;

// console.log({ url });

export let axiosInstance = $state({
	config: axios.create({
		baseURL: url,
		// withCredentials: true,
		headers: {
			'Content-Type': 'application/json' // Set appropriate headers
		}
	}),
	setToken(val: string) {
		if (val) {
			this.config.defaults.headers.common['Authorization'] = `Bearer ${val}`;
		} else {
			delete this.config.defaults.headers.common['Authorization'];
		}
	}
});

export default axiosInstance;
