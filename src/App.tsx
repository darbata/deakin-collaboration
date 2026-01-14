import {createBrowserRouter, RouterProvider, Outlet} from "react-router";
import HomePage from "@/pages/home/HomePage.tsx";
import GlobalProviders from "@/components/GlobalProviders.tsx";
import NavBar from "@/components/navbar/NavBar.tsx";
import ProjectsPage from "@/pages/projects/ProjectPage.tsx";
import GithubPage from "@/pages/github/GithubPage.tsx";
import DiscussionsPage from "@/pages/discussions/DiscussionPage.tsx";
import EventsPage from "@/pages/events/EventsPage.tsx";

function Layout() {
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
        </>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true, // Matches exactly "/"
                Component: HomePage,
            },
            {
                path: "projects",
                Component: ProjectsPage,
            },
            {
                path: "github",
                Component: GithubPage
            },
            {
                path: "discussions",
                Component: DiscussionsPage
            },
            {
                path: "events",
                Component: EventsPage
            }
        ],
    },
]);

export default function App() {

    return (
        <GlobalProviders>
            <RouterProvider router={router} />
        </GlobalProviders>
    )
}