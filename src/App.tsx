import {createBrowserRouter, RouterProvider} from "react-router";
import HomePage from "@/pages/home/HomePage.tsx";
import GlobalProviders from "@/components/GlobalProviders.tsx";
import NavBar from "@/components/navbar/NavBar.tsx";
import ProjectsPage from "@/pages/projects/ProjectPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomePage,
    },
    {
        path: "/projects",
        Component: ProjectsPage
    }
])

export default function App() {

    return (
        <GlobalProviders>
            <NavBar />
            <RouterProvider router={router} />
        </GlobalProviders>
    )
}