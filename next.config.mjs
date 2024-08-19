/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
    // Add any other Next.js configuration here if needed
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/styles')],
    },
};

export default nextConfig;