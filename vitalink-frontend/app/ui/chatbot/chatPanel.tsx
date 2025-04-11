"use client";
import { useState } from "react";
import ChatBox from "./chatbox";
import ChatBubbles from "./chatbubble";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
export default function ChatPanel() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div
      className={` py-4 rounded-lg overflow-hidden h-full  ${
        !isOpen ? "w-40" : "w-2/3"
      } transition-all duration-300 ease-in relative grow`}
    >
      <div className="hidden  h-full max-h-screen  bg-white rounded-lg p-8 overflow-hidden border-zinc-100 lg:flex flex-col gap-4">
        {isOpen ? (
          <>
            <div className="border-b border-zinc-200 w-full pb-2 flex flex-row justify-between">
              <div>
                <h1 className="font-semibold text-2xl">MediAssist</h1>
                <p>Sử dụng MediAssist Chatbot để điền đơn ngay</p>
              </div>
              <button onClick={() => setIsOpen(!isOpen)} className="">
                <ArrowLeftIcon width={24} height={24} />
              </button>
            </div>
            <ChatBubbles />
            <ChatBox />
          </>
        ) : (
          <>
          <button onClick={() => setIsOpen(!isOpen)} className="flex flex-col items-center">
                <ChatBubbleLeftIcon width={36} height={36} />
                <h1 className="-rotate-90 pr-36 font-bold text-3xl text-right">MediAssist Chatbot</h1>
              </button>
          </>
        )}
      </div>
    </div>
  );
}
