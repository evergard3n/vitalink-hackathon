import ChatBox from "./chatbox";
import ChatBubbles from "./chatbubble";
export default function ChatPanel() {
  return (
    <div className=" py-4 rounded-lg overflow-hidden grow h-full">
      <div className="w-full h-full bg-white rounded-lg p-8 border-4 overflow-hidden border-zinc-100 flex flex-col gap-4">
        <div className="border-b border-zinc-200 w-full pb-2">
        <h1 className="font-semibold text-2xl">MediAssist</h1>
        <p>Trợ lý ảo thông minh</p>
        </div>
        <ChatBubbles/>
        <ChatBox/>
      </div>
    </div>
  );
}
