import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { removeToken, setToken } from "~/utils/axios-utils";

// Custom hook to redirect to login page if token is not set
const usePrivateRoute = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // @TODO: Instead of just checking the token, check if token is valid
    if (!token) {
      removeToken();
      queryClient.clear();
      navigate("/login");
      return;
    }

    setToken(token);
    setIsInitialized(true);
  }, [navigate, queryClient]);

  return { isInitialized };
};

export default usePrivateRoute;
