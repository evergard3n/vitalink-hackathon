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
    href: "/patients/chat",
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
    <div className="w-full lg:w-40 z-20 h-18 lg:h-fit fixed lg:relative bg-white drop-shadow-xs transition-all duration-200 ease-in backdrop-blur-sm min-h-12 md:border border-b border-zinc-200 flex flex-row md:rounded-lg items-center gap-8 px-4">
      <div className="flex flex-row lg:flex-col lg:py-6 justify-between md:justify-center w-full items-center gap-8">
        <button className="block lg:hidden scale-125">
          <Bars3Icon
            width={16}
            height={16}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </button>
        <div className="w-full grow  flex flex-row items-center justify-center">
          <Link
            href={"/"}
            className="w-36 h-12  flex flex-row items-center justify-center"
          >
            <Image
              src={"/logo.png"}
              width={500}
              height={500}
              alt={"logo"}
              className=""
            ></Image>
          </Link>
        </div>
        {isOpen && (
          <div className="bg-white absolute top-18 py-8  left-0 h-fit w-full">
            <ol className="flex flex-col z-50 md:flex-row md:justify-center items-center gap-12 md:ml-12">
              {navItems.map((item) => (
                <NavItem key={item.href} href={item.href} name={item.name} />
              ))}
            </ol>
          </div>
        )}
        <ol className=" hidden lg:flex flex-col md:justify-center items-start gap-12 ">
          {navItems.map((item) => (
            <NavItem key={item.href} href={item.href} name={item.name} />
          ))}
        </ol>
        <div className="scale-125 flex flex-row items-center justify-center lg:border-t lg:border-zinc-200 lg:w-full lg:pt-4 ">
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
