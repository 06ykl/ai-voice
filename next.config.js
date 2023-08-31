/** @type {import("next").NextConfig} */
const nextConfig = {
	env: {
		OPENAI_API_KEY: process.env.OPENAI_API_KEY,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	async rewrites() {
		return [
			{
				source: "/home",
				destination: "/",
			},
			{
				source: "/app",
				destination: "/",
			},
		];
	},
};

module.exports = nextConfig;
