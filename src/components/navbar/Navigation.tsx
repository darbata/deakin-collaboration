"use client";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/events", label: "Events" },
    { href: "/profile", label: "Profile" },
];


export default function Navigation() {
    return (
        <div>
            <NavigationMenu>
                <NavigationMenuList className="gap-2">
                    {links.map((link) => {

                        const isActive = false;

                        return (
                            <NavigationMenuItem key={link.label}>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()} active={isActive}>
                                    <p className={`font-semibold text-xl ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                                        {link.label}
                                    </p>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        )
                    })}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}