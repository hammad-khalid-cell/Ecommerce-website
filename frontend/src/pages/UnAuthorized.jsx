import { Link } from "react-router-dom";

const UnAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Unauthorized Access
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Sorry, you don’t have permission to view this page. 
        Please contact an administrator if you think this is a mistake.
      </p>
      <Link
        to="/"
        className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default UnAuthorized;


