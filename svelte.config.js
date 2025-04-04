import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Használjuk a Netlify adaptert
		adapter: adapter({
			// Edge functions használata a jobb teljesítményért
			edge: true,
			
			// Split the app into smaller chunks
			split: true
		})
	}
};

export default config;
