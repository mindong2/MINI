import { useState, useEffect, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { auth } from "./firebase";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  // firebase init!
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  return <Suspense fallback={<LoadingScreen />}>{isLoading ? <LoadingScreen></LoadingScreen> : <RouterProvider router={router} />}</Suspense>;
}

export default App;
