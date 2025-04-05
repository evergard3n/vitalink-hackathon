"use client";
import { useState, useRef } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useWebSocket } from "@/app/lib/wsContext";

export default function ChatBox() {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage } = useWebSocket() || {};
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust to content
    }
  };
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(sendMessage) {
      sendMessage(text);
    }
    setText("");
  }
  return (
    <div className="bg-zinc-100 w-[95%] bottom-5 rounded-lg p-2 mb-3">
      <form action="" onSubmit={handleSubmit} className="relative w-full h-fit flex flex-col">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            adjustHeight();
          }}
          className="rounded-lg p-2 focus:outline-none resize-none w-full overflow-hidden min-h-12 max-h-24"
          placeholder="Hỏi bất cứ điều gì..."
          required
          rows={1}
          
        />
        <div className="flex flex-row justify-end">
        <button
          type="submit"
          className="bg-zinc-900 text-white px-4 py-2 rounded-lg flex flex-row items-center gap-2 w-fit mt-2"
        >
          <p>Gửi</p>
          <PaperAirplaneIcon width={16} height={16} />
        </button>
        </div>
      </form>
    </div>
  );
}
