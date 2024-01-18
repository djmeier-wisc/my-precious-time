/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
			{
				source: '/api/:path*',
				destination: `http://localhost:8080/:path*`,
			},
			{
				source: "/v3/api-docs/:path*",
				destination: 'http://localhost:8080/v3/api-docs/:path*'
			}
		]
    }
}

module.exports = nextConfig
