import { createBrowserRouter } from "react-router-dom";

import App from "../App";

import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails/MovieDetails";
import About from "../pages/About/About";
import Discover from "../pages/Discover/Discover";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "discover",
        element: <Discover />,
      },
      {
        path: "movie/:id",
        element: <MovieDetails />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },

  {
    path: "login",
    element: <Login />,
  },

  {
    path: "register",
    element: <Register />,
  },
]);

export default router;
