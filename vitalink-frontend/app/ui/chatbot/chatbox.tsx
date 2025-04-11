"use client";
import { useState, useRef, useEffect } from "react";
import { MicrophoneIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useWebSocket } from "@/app/lib/wsContext";
import { useAudioRecorder } from "@/app/lib/transcriptContext";

export default function ChatBox() {
  const [text, setText] = useState("");
  const [recording, setRecording] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const audioRecorderContext = useAudioRecorder();
  const {
    startRecording,
    stopRecording,
    isRecording,
    clearTranscript,
    status,
  } = audioRecorderContext || {};
  const transcript = audioRecorderContext?.transcript || "";
  const { sendMessage } = useWebSocket() || {};
  useEffect(() => {
    setText((prev) => prev + transcript);
  }, [transcript]);
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust to content
    }
  };
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendMessage) {
      sendMessage(text);
    }
    setText("");
  }
  function handleClick() {
    if (!recording) {
      startRecording();
      setRecording(true);
    } else {
      stopRecording();
      setRecording(false);
    }
  }
  return (
    <div className="bg-zinc-100 w-full bottom-5 rounded-lg p-2 mb-3">
      <form
        action=""
        onSubmit={handleSubmit}
        className="relative w-full h-fit flex flex-col"
      >
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

        {status}
        {transcript}

        <div className="flex flex-row justify-between items-center">
          <button
            onClick={handleClick}
            className={`border-zinc-600 border text-black p-2 rounded-full w-fit h-fit ${isRecording ? "bg-red-500 text-white border-none ": "bg-none"}`}
          >
            <MicrophoneIcon width={16} height={16}></MicrophoneIcon>
          </button>
          <button
            type="submit"
            className={`bg-zinc-900 text-white px-4 py-2 rounded-lg flex flex-row items-center gap-2 w-fit mt-2 `}
          >
            <p>Gửi</p>
            <PaperAirplaneIcon width={16} height={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
