/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
            protocol: 'https',
            hostname: 'qzlijysngjtrfesbyptp.supabase.co',
            pathname: '/**',
        },
      ],
    },
};

export default nextConfig;
