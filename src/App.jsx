import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import Home from "./home/Home";
import Header from "./components/custom/Header";
import { Toaster } from "react-hot-toast";

function App() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Navigate to={"/auth/sign-in"} />;
  }

  return (
    <>
      <Header />

      <Outlet />
      <Toaster/>
    </>
  );
}

export default App;
