'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({href, name}: {href: string, name: string}) {
    const pathname = usePathname();
    return (
        <Link href={href} className={`text-md md:text-sm lg:text-lg ${pathname.includes(href) ? "bg-zinc-800 text-white px-4 py-2 rounded-lg" : "text-black"}`}>{name}</Link>
)
}