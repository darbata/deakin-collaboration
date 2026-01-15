import Navigation from "@/components/navbar/Navigation";
import Logo from "@/components/Logo";
import AuthStatus from "@/components/navbar/AuthStatus";

export default function NavBar() {
    return (
        <nav className="flex justify-between items-center w-full bg-background border-b h-16 mb-2">
            <div className="flex flex-1 justify-start"><Logo /></div>
            <div className="flex justify-center"><Navigation /></div>
            <div className="flex flex-1 justify-end"><AuthStatus /></div>
        </nav>
    );
}