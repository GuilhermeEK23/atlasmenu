import { Loader2 } from "lucide-react";

const LoadingAuth = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="animate-spin h-5 w-5 mr-3" />
    </div>
  );
};

export default LoadingAuth;
