import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import styled from "styled-components";
import { auth } from "./firebase";

const LoadingScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: #fff;
  font-size: 36px;
`;

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

  return <>{isLoading ? <LoadingScreen>Loading...</LoadingScreen> : <RouterProvider router={router} />}</>;
}

export default App;
