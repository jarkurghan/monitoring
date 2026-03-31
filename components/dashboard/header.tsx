"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, Clock, Instagram } from "lucide-react";
import { Button } from "../ui/button";

const navItems = [
    { label: "Namoz vaqtlari bot", href: "/prayer-times-bot", icon: <Clock className="h-4 w-4" /> },
    { label: "Insta saver bot", href: "/insta-saver-bot", icon: <Instagram className="h-4 w-4" /> },
];

export function Header({ headerMenuItems }: { headerMenuItems: { label: string; href: string; target: string; icon: React.ReactNode }[] }) {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    const currentItem = navItems.find((item) => isActive(item.href));

    return (
        <header className="inline-block sm:flex items-center justify-center w-full sm:w-auto">
            <nav className="flex items-center justify-between sm:justify-center bg-card rounded-full px-2 py-1.5 border border-border">
                <div className="w-full sm:w-auto rounded-full px-4 py-1.5 text-sm font-medium transition-colors bg-[var(--color-accent)] text-foreground">
                    <span className="inline-flex items-center gap-2">{currentItem?.label}</span>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus:bg-transparent active:bg-transparent hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-none"
                        >
                            <ChevronDown className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {headerMenuItems.map((item) => (
                            <Link href={item.href} target={item.target || "_self"}>
                                <DropdownMenuItem key={item.href}>
                                    {item.icon}
                                    {item.label}
                                </DropdownMenuItem>
                            </Link>
                        ))}
                        <DropdownMenuSeparator />
                        {navItems
                            .filter((item) => item.href !== currentItem?.href)
                            .map((item) => (
                                <Link href={item.href} target="_self">
                                    <DropdownMenuItem key={item.href}>
                                        {item.icon}
                                        {item.label}
                                    </DropdownMenuItem>
                                </Link>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
        </header>
    );
}
