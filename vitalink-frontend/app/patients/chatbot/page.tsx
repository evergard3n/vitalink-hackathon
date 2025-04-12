import ChatBox from "@/app/ui/chatbot/chatbox";
import ChatBubbles from "@/app/ui/chatbot/chatbubble";

export default function Page() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className=" md:w-1/2 px-2 md:min-w-[600px] flex flex-col items-end ">
        <ChatBubbles />
        <ChatBox />
      </div>
    </div>
  );
}
