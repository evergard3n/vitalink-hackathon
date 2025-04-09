import NavBar from "../ui/navbar/navbar";
import { WebSocketProvider } from "../lib/wsContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WebSocketProvider>
      <div className="w-full min-h-screen flex flex-col md:flex-row bg-white">
        <div className="relative lg:w-48 w-full h-full md:top-4 md:px-4">
          <NavBar />
        </div>
        {children}
      </div>
    </WebSocketProvider>
  );
}
