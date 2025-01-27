import { ErrorIllustration } from '@assets/icons';
import Link from 'next/link';


const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <ErrorIllustration className="w-[300px] md:w-[100%]" />
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 md:mb-4 md:mt-20">
                404 - Page Not Found
            </h1>
            <p className="text-sm md:text-lg text-gray-600 mb-6">
                The page you’re looking for doesn’t exist
            </p>
            <Link href={`/`} className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primaryDark">
                Return to Home
            </Link>
        </div>
    );
};

export default NotFound;