"use client";
import { useState } from "react";
import Form from "../../ui/form/form";
import { ArrowLeftIcon, ArrowRightIcon, DocumentIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export default function Page() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={`relative  h-full lg:bg-zinc-100 p-2 ${open ? "lg:w-full" : "lg:w-12"} transition-all duration-100 ease-in`}>
      <div className={`h-full ${open ? "" : "hidden border-r"}`}>
        <button onClick={() => setOpen(false)} className="absolute z-50 top-14 right-12 flex flex-row px-4 py-2 gap-2 rounded-full hover:bg-zinc-200">Ẩn <ArrowRightIcon width={24} height={24}></ArrowRightIcon></button>
        <Form />
      </div>
      {
        !open && (
            <button className="mt-12 p-2 rounded-full hover:bg-zinc-200">
                <DocumentTextIcon width={24} height={24} onClick={() => setOpen(true)}/>
            </button>
        )
      }
    </div>
  );
}
