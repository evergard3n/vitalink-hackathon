"use client";
import { Bars3Icon} from "@heroicons/react/24/outline";
import NavItem from "./navitem";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
const navItems = [
  {
    href: "/patients/create",
    name: "Đặt lịch khám ",
  },
  {
    href: "/patients/search",
    name: "Tra cứu lịch khám ",
  },
  {
    href: "/patients/chatbot",
    name: "Trợ lý ảo ",
  },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false); // Close the menu on pathname change
  }, [pathname]);
  return (
    <div className="w-full md:w-[90%] fixed md:absolute z-20 h-18 bg-linear-to-br from-white to-zinc-150 drop-shadow-xs transition-all duration-200 ease-in backdrop-blur-sm min-h-12 md:border border-b border-zinc-200 md:rounded-lg flex flex-row items-center gap-8  px-4">
      <div className="flex flex-row justify-between md:justify-center w-full items-center gap-4">
        <button className="block md:hidden scale-125">
          <Bars3Icon
            width={16}
            height={16}
            onClick={() => {
              setIsOpen(!isOpen);
              console.log(isOpen)
            }}
          />
        </button>
        <Link href={"/"} className="flex flex-row items-center justify-center">
        <div className="w-36 h-36">
        <Image src={"/logo.png"} width={500} height={500} alt={"logo"} className=""></Image>
        </div>
        </Link>
        {isOpen && (
          <div className=" bg-white absolute top-18 py-8 opacity-95 backdrop-blur-2xl left-0 h-fit w-full z-60">
            <ol className="flex flex-col md:flex-row md:justify-center items-center gap-12 md:ml-12">
              {navItems.map((item) => (
                <NavItem key={item.href} href={item.href} name={item.name} />
              ))}
            </ol>
          </div>
        )}

        <ol className="hidden lg:flex lg:flex-row lg:justify-center items-center gap-12 md:ml-12">
          {navItems.map((item) => (
            <NavItem key={item.href} href={item.href} name={item.name} />
          ))}
        </ol>
        <div className="scale-125 md:pl-16 pt-1 flex flex-row items-center gap-4">
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}

