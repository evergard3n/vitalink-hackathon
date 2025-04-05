
import Chatbot from "@/app/ui/chatbot/chatbot";
import Progress from "@/app/ui/progress";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 flex flex-col relative">
      <div className="flex flex-col items-start justify-between h-full px-16 gap-8 w-full">
        <div className="w-full h-20"></div>
        <div className="grow flex flex-col items-start gap-4 lg:relative">
          <h1
            className={`text-4xl text-center md:text-left md:text-6xl  leading-tight font-semibold`}
          >
            Đăng ký khám bệnh <br className="hidden lg:block"></br> dễ dàng{" "}
          </h1>
          <div className="md:block hidden">
            <Progress />
          </div>
          <p className="text-md mt-8 md:text-left text-center md:pb-0 pb-4">
            Sử dụng Chatbot để hỗ trợ điền đơn ngay.{" "}
          </p>
          <div className="lg:static fixed right-6 bottom-6 lg:top-0 lg:left-0 z-50">
            <Chatbot />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
