import {createBrowserRouter, RouterProvider, Outlet} from "react-router";
import HomePage from "@/pages/home/HomePage.tsx";
import GlobalProviders from "@/components/GlobalProviders.tsx";
import NavBar from "@/components/navbar/NavBar.tsx";
import ProjectsPage from "@/pages/projects/ProjectPage.tsx";
import GithubPage from "@/pages/github/GithubPage.tsx";
import DiscussionsPage from "@/pages/discussions/DiscussionPage.tsx";
import EventsPage from "@/pages/events/EventsPage.tsx";
import Footer from "@/components/Footer.tsx"
import {UnitDetailsPage} from "@/pages/discussions/UnitDetailsPage.tsx";
import {DiscussionThreadPage} from "@/pages/discussions/DiscussionThreadPage.tsx";
import ProjectDashboardPage from "@/pages/projects/ProjectDashboardPage.tsx";
import ProfilePage from "@/pages/profile/ProfilePage.tsx";

function Layout() {
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Footer />
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
                path: "profile",
                Component: ProfilePage
            },
            {
                path: "projects",
                Component: ProjectsPage,
            },
            {
                path: "projects/:projectId",
                Component: ProjectDashboardPage
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
                path: "discussions/:topic",
                Component: UnitDetailsPage
            },
            {
                path: "discussions/threads/:discussionId",
                Component: DiscussionThreadPage
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