import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

// Cập nhật Authorization header trong axiosInstance.
const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Nếu có token thì thêm vào header dưới dạng Bearer token.
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"]; // Nếu không có thì xóa header đi.
  }
};

// Đây là một wrapper component, nhận children (các thành phần con) và bao bọc bên ngoài để đảm bảo rằng xác thực được xử lý trước khi render các thành phần con.
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus } = useAuthStore;
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken(); // Lấy token từ Clerk
        updateApiToken(token); // Gắn token vào axios header
        if (token) {
          await checkAdminStatus();
        }
      } catch (error: any) {
        updateApiToken(null); // Nếu lỗi thì xóa token
        console.log("Error in auth provider", error);
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };

    initAuth();
  }, [getToken, userId, checkAdminStatus]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />{" "}
        {/* Icon Loader dùng để hiển thị trạng thái loading với hiệu ứng quay (animate-spin). */}
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
