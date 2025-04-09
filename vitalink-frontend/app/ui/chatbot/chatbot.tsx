"use client";
import {
  ChatBubbleBottomCenterIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import ChatBox from "./chatbox";
import ChatBubbles from "./chatbubble";
import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState<boolean>(true);
  if (open) {
    return (
      <div className="bg-white rounded-lg w-96 flex flex-col items-center overflow-hidden absolute lg:-bottom-10 lg:left-0 z-50 -right-3 bottom-0  drop-shadow-sm">
        <div className="h-12 bg-white border-b border-zinc-100 flex flex-row justify-between px-4 items-center text-black text-md w-full font-semibold">
          <p>VitaLink Chatbot</p>
          <button onClick={() => setOpen(false)}>
            <PlusCircleIcon width={24} height={24} className="rotate-45" />
          </button>
        </div>
        <ChatBubbles />
        <ChatBox />
      </div>
    );
  } else {
    return (
      <div className=" group">
        <button
          className="flex flex-row gap-1 items-center justify-center group-hover:bg-zinc-700 bg-zinc-900 text-white py-2 px-4 rounded-lg transition-colors duration-150 ease-in"
          onClick={() => setOpen(true)}
        >
          <ChatBubbleBottomCenterIcon width={18} height={18} />
          <p>Chatbot</p>
        </button>
      </div>
    );
  }
}
