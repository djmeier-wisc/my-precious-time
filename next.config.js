/** @type {import('next').NextConfig} */
const API_URL = "http://localhost:8080/"
const nextConfig = {
    async rewrites() {
        return [
			{
				source: '/api/:path*',
				destination: `${API_URL}/:path*`,
			},
		]
    }
}

module.exports = nextConfig
