import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./auth/sign-in/SignIn.jsx";
import Home from "./home/Home.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import EditResume from "./dashboard/resume/[resumeId]/EditResume.jsx";
import ViewResume from "./my-resume/[resumeId]/view/ViewResume.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: <EditResume />,
      },
    ],
  },
  {
    path: "/auth/sign-in",
    element: <SignIn />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/my-resume/:resumeId/view",
    element: <ViewResume/>
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
);
