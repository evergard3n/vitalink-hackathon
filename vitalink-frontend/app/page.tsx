
import {
  PlusCircleIcon,
  DocumentPlusIcon,
  DocumentMagnifyingGlassIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="md:w-1/2 md:h-1/2 md:min-w-[800px] bg-white rounded-2xl md:drop-shadow-lg grid md:grid-cols-2 overflow-hidden">
        <div className="h-full min-h-24 flex flex-col items-start justify-center px-10 bg-white">
          <div className="flex flex-row items-center">
            {/* <PlusCircleIcon
              width={50}
              height={50}
              className="text-white"
            ></PlusCircleIcon>
            <h1 className="text-6xl font-black text-white">VitaLink</h1> */}
            <Image src={"/logo.png"} width={500} height={500} alt={"logo"} className=""></Image>
          </div>
        </div>
        <div>
          <div className="h-full grid grid-cols-2 justify-center items-center p-8 gap-4">
            <Link
              href={"/patients/create"}
              className="w-full h-full min-h-36 bg-zinc-100  rounded-lg flex flex-col justify-center items-center"
            >
              <DocumentPlusIcon
                width={48}
                height={48}
                className="text-black"
              ></DocumentPlusIcon>
              <p className=" text-lg pt-4 font-semibold">Đặt lịch khám</p>
            </Link>
            <Link
              href={"/patients/search"}
              className="w-full h-full min-h-36 bg-zinc-100  rounded-lg flex flex-col justify-center items-center"
            >
              <DocumentMagnifyingGlassIcon
                width={48}
                height={48}
                className="text-black"
              ></DocumentMagnifyingGlassIcon>
              <p className=" text-lg pt-4 font-semibold">Tra cứu hồ sơ</p>
            </Link>
            <Link
              href={"/patients/chatbot"}
              className="w-full h-full min-h-36 bg-zinc-100  rounded-lg flex flex-col justify-center items-center"
            >
              <ChatBubbleBottomCenterIcon
                width={48}
                height={48}
                className="text-black"
              ></ChatBubbleBottomCenterIcon>
              <p className=" text-lg pt-4 font-semibold">Chatbot</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
