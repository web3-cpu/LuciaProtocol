import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import router from "./router";
import { initAxios } from "./utils/axios-utils";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: Infinity,
    },
    mutations: {},
  },
});

initAxios();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
