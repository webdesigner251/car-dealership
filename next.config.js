/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
 
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/car-dealership" : "",
  assetPrefix: isProd ? "/car-dealership/" : "",
};
 
export default nextConfig;