import Chatbot from "@/app/ui/chatbot/chatbot";
import ChatPanel from "@/app/ui/chatbot/chatPanel";
import Progress from "@/app/ui/progress";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full  flex flex-col lg:flex-row relative">
      <div className="lg:hidden  flex flex-col items-start justify-between h-full px-16 gap-8 w-full">
        <div className="grow flex flex-col items-start gap-4 lg:relative">
          <div className="md:block hidden">
            <Progress />
          </div>
          <p className="text-md mt-8 md:text-left text-center md:pb-0 pb-4">
            Sử dụng Chatbot để hỗ trợ điền đơn ngay.{" "}
          </p>
          <div className="fixed right-6 bottom-6 lg:top-0 lg:left-0 z-50">
            <Chatbot />
          </div>
        </div>
      </div>
      <ChatPanel />
      <div className="grow">
      {children}
      </div>
    </div>
  );
}
