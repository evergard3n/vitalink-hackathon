"use client";
import { useState } from "react";
import NavItem from "./navitem";
import { Bars3Icon } from "@heroicons/react/24/outline";
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
export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  if (isOpen) {
    return (
      <div className=" bg-black absolute top-18 py-8 opacity-95 backdrop-blur-2xl left-0 h-fit w-full">
        <ol className="flex flex-col md:flex-row md:justify-center items-center gap-12 md:ml-12">
          {navItems.map((item) => (
            <NavItem key={item.href} href={item.href} name={item.name} />
          ))}
        </ol>
      </div>
    );
  } else {
    return (
        <button>
            <Bars3Icon width={24} height={24} onClick={() => setIsOpen(true)}/>
        </button>
    )
  }
}
