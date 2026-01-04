import "./index.css"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router";
import HomePage from "./home/HomePage.tsx";
import ProjectsPage from "./projects/ProjectPage.tsx";
import GithubPage from "./github/GithubPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomePage,
    },
    {
        path: "/projects",
        Component: ProjectsPage,
    },
    {
        path: "/github",
        Component: GithubPage,
    },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router}>
      </RouterProvider>
  </StrictMode>,
)
