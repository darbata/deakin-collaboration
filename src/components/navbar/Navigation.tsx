import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {Link, useLocation} from "react-router"

const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/events", label: "Events" },
    { href: "/profile", label: "Profile" },
];

export default function Navigation() {

    const location = useLocation();

    return (
        <div>
            <NavigationMenu>
                <NavigationMenuList className="gap-2">
                    {links.map((link) => {

                        const isActive = location.pathname === link.href;

                        return (
                            <NavigationMenuItem key={link.label}>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()} active={isActive}>
                                    <Link to={link.href} className={`font-semibold text-xl ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                                        {link.label}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        )
                    })}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}