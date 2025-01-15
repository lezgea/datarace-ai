// app/not-found.tsx
export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="mt-4 text-gray-600">
                Sorry, the page you are looking for does not exist.
            </p>
            <a href="/" className="mt-6 text-blue-500 hover:underline">
                Go back to the homepage
            </a>
        </div>
    );
}
