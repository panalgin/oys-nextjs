import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const serverEnvPath = path.join(process.cwd(), '.env.server');

let serverEnv = {};
if (fs.existsSync(serverEnvPath)) {
	serverEnv = dotenv.parse(fs.readFileSync(serverEnvPath));
	Object.keys(serverEnv).forEach(key => {
		if (key.startsWith('NEXT_SERVER_')) {
			process.env[key] = serverEnv[key];
		}
	});
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
  images: {
		remotePatterns: [
			{
				hostname: 'lh3.googleusercontent.com',
			},
		],
  },
  serverRuntimeConfig: Object.fromEntries(
    Object.entries(serverEnv).filter(([key]) => key.startsWith('NEXT_SERVER_'))
  ),
};

export default nextConfig;
