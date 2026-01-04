import Navigation from "@/components/navbar/Navigation";
import Logo from "@/components/Logo";
import AuthStatus from "@/components/navbar/AuthStatus";

export default function NavBar() {
    return (
        <nav className="flex justify-between items-center w-full bg-background border-b h-16 mb-2">
            <Logo />
            <Navigation />
            <AuthStatus />
        </nav>
    );
}