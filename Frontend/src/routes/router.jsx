import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails/MovieDetails";
import About from "../pages/About/About";

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
        path: "movie/:id",
        element: <MovieDetails />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

export default router;