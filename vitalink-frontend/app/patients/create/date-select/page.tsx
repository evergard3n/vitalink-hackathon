import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Page() {
  return (
    <div className="p-4 rounded-lg overflow-hidden grow h-full">
      <div className="w-full h-full bg-white rounded-lg p-8 border-8 border-zinc-100 flex flex-col gap-4">
        <Link
          href={"/patients/create"}
          className="flex flex-row items-center gap-2"
        >
          <ArrowLeftIcon width={16} height={16}></ArrowLeftIcon>Quay lại
        </Link>
        <h1 className="text-left font-bold text-4xl">Chọn ngày khám</h1>
      </div>
    </div>
  );
}
