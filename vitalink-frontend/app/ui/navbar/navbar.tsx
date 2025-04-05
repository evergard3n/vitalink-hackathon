"use client";
import { Bars3Icon, PlusCircleIcon } from "@heroicons/react/24/outline";
import NavItem from "./navitem";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
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
    href: "/patients/chat",
    name: "Trợ lý ảo ",
  },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full md:w-[90%] fixed md:absolute z-20 h-18 bg-linear-to-br from-white to-zinc-150 drop-shadow-xs transition-all duration-200 ease-in backdrop-blur-sm min-h-12 md:border border-b border-zinc-200 md:rounded-lg flex flex-row items-center gap-8  px-4">
      <div className="flex flex-row justify-between md:justify-center w-full items-center gap-4">
        <button className="block md:hidden scale-125">
          <Bars3Icon
            width={16}
            height={16}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </button>
        <Link href={"/"} className="flex flex-row items-center justify-center">
          <PlusCircleIcon width={24} height={24} />
          <h1 className="text-2xl font-black">VitaLink</h1>
        </Link>
        {isOpen && (
          <div className=" bg-white absolute top-18 py-8 opacity-95 backdrop-blur-2xl left-0 h-fit w-full">
            <ol className="flex flex-col md:flex-row md:justify-center items-center gap-12 md:ml-12">
              {navItems.map((item) => (
                <NavItem key={item.href} href={item.href} name={item.name} />
              ))}
            </ol>
          </div>
        )}
        <ol className=" hidden md:flex flex-col md:flex-row md:justify-center items-center gap-12 md:ml-12">
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
