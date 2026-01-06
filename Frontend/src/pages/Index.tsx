import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

const Index = () => {
  // For now, show the dashboard directly
  // In a real app, this would check auth state
  return <Dashboard />;
};

export default Index;
