import DateSelector from "@/app/ui/dateselect";
import EditDepartments from "@/app/ui/departments and checkup/editDepartments";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
const departments: string[] = [
  "Khoa Tai mũi họng",
  "Khoa Tim mạch",
  "Khoa Tâm lý - Tâm thần",
];

export default function Page() {
  return (
    <div className="p-4 rounded-lg overflow-hidden grow h-full">
      <div className="w-full h-full bg-white rounded-lg p-8 border-8 border-zinc-100 flex flex-col gap-4">
        <Link
          href={"/patients/create/checkup"}
          className="flex flex-row items-center gap-2"
        >
          <ArrowLeftIcon width={16} height={16}></ArrowLeftIcon>Quay lại
        </Link>
        <h1 className="text-left font-bold text-4xl">Chuyên khoa đề xuất</h1>

        <p>
          Dựa trên triệu chứng và yêu cầu của bạn, đây là các chuyên khoa bạn
          nên tới khám:
        </p>
        <EditDepartments departments={departments}></EditDepartments> 
        <div className="w-full h-0.5 bg-zinc-100"></div>
       
        <h1 className="text-left font-bold text-4xl">Chọn ngày khám</h1>
        <DateSelector/>
      </div>
    </div>
  );
}
