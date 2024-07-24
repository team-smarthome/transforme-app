import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "tailwindcss/tailwind.css";

import MainMenu from "./pages/MainMenu";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import Loader from "./common/Loader";
import routes from "./routes";
import DefaultLayout from "./layout/DefaultLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainMenuWorkstation from "./pages/MainMenuWorkstation";

function App() {
  const [loading, setLoading] = useState(true);
  const queryClient = new QueryClient();
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/home" element={<MainMenu />} />
          <Route path="/dashboard" element={<MainMenuWorkstation />} />
          <Route element={<DefaultLayout />}>
            {routes.map(({ path, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <React.Suspense fallback={<Loader />}>
                    <Component />
                  </React.Suspense>
                }
              />
            ))}
          </Route>
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
