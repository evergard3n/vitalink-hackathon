import NavBar from "../ui/navbar/navbar";
import { WebSocketProvider } from "../lib/wsContext";
import { FormProvider } from "../lib/formContext";
import { AudioRecorderProvider } from "../lib/transcriptContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AudioRecorderProvider>
      <FormProvider>
      <WebSocketProvider>
        <div className="w-full min-h-screen flex flex-col lg:flex-row bg-white">
          <div className="relative lg:w-48 w-full h-full md:top-4 md:px-4">
            <NavBar />
          </div>
          <div className="block lg:hidden w-full h-30"></div>
          {children}
        </div>
      </WebSocketProvider>
    </FormProvider>
    </AudioRecorderProvider>
  );
}
