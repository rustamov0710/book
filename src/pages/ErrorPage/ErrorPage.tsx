import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] text-2xl">
      <img width={720} height={476} src="/not-found.png" alt="not-found" />
      <div className="flex items-center justify-center mt-[72px] gap-4">
        <button
          onClick={() => navigate("/")}
          className="w-[260px] h-[40px] border-2 border-transparent bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 font-medium text-base text-[#fefefe] px-16 py-1.5"
        >
          Go Home Page
        </button>
        <button
          onClick={() => {
              navigate("/signin");
          }}
          className="w-[260px] h-[40px] bg-transparent border-2 border-purple-600 rounded-md focus:outline-none focus:ring-2 transition duration-200 font-medium text-base text-purple-600 px-16 py-1.5"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
