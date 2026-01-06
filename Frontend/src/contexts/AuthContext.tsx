import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: "owner" | "tenant";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (emailOrPhone: string, password: string) => Promise<boolean>;
  verifyOTP: (otp: string) => Promise<boolean>;
  logout: () => void;
  pendingAuth: { emailOrPhone: string; password: string } | null;
  setPendingAuth: (data: { emailOrPhone: string; password: string } | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy user data
const DUMMY_USER: User = {
  id: "1",
  name: "Pratham",
  email: "pratham@livigo.com",
  phone: "9876543210",
  userType: "owner",
};

const DUMMY_OTP = "123456";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("livigo_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [pendingAuth, setPendingAuth] = useState<{ emailOrPhone: string; password: string } | null>(null);

  const login = async (emailOrPhone: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // For demo, accept any email/phone with password "password123"
    if (password === "password123" || password.length >= 6) {
      setPendingAuth({ emailOrPhone, password });
      return true;
    }
    return false;
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Accept dummy OTP or any 6-digit code for demo
    if (otp === DUMMY_OTP || otp.length === 6) {
      setUser(DUMMY_USER);
      localStorage.setItem("livigo_user", JSON.stringify(DUMMY_USER));
      setPendingAuth(null);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("livigo_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        verifyOTP,
        logout,
        pendingAuth,
        setPendingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
