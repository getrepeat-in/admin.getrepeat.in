"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavUser } from "./fragments/nav-user";
import { navItems } from "./helpers/constants";

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen bg-zinc-50 border-r border-zinc-200 flex flex-col transition-all duration-300 ease-in-out dark:bg-[#0a0a0a] dark:border-zinc-800">
            <div className="h-18 bg-white flex items-center p-6 border-b border-zinc-200 dark:border-zinc-800">
                <img
                    src="/assets/logo/getrepeat-logo.png"
                    alt="Get Repeat Logo"
                    className="object-contain hover:opacity-80 transition-opacity"
                    priority
                />
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-[10px] transition-all group relative overflow-hidden",
                                isActive
                                    ? "bg-[#f2715b]/10 text-[#f2715b] shadow-sm dark:bg-[#f2715b]/15"
                                    : "text-zinc-600 hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100"
                            )}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#f2715b] rounded-r-full" />
                            )}
                            <item.icon className={cn(
                                "w-[18px] h-[18px] transition-colors",
                                isActive ? "text-[#f2715b]" : "text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300"
                            )} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-2 border-t bg-white border-zinc-200 dark:border-zinc-800">
                <NavUser />
            </div>
        </aside>
    );
}
