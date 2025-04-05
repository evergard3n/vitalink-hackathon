import NavBar from "../ui/navbar/navbar";
import { WebSocketProvider } from "../lib/wsContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WebSocketProvider>
      <div className="w-full min-h-screen flex flex-col bg-linear-to-b from-white to-zinc-200">
        <div className="relative lg:w-1/2 w-full md:top-4 md:left-12">
          <NavBar />
        </div>
        {children}
      </div>
    </WebSocketProvider>
  );
}
