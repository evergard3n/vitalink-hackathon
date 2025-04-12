import { getCurrentPatientInfo } from "@/app/lib/data";
import { Patient } from "@/app/lib/definitions";
import ValidateScreening from "@/app/ui/validate-screening";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Page() {
  const patient_info: Patient = await getCurrentPatientInfo("1");
  return (
    <div className="p-4 rounded-lg overflow-hidden grow h-full">
      <div className="w-full h-full bg-white rounded-lg p-8 border-8 border-zinc-100 flex flex-col gap-4">
        <Link
          href={"/patients/create/checkup"}
          className="flex flex-row items-center gap-2"
        >
          <ArrowLeftIcon width={16} height={16}></ArrowLeftIcon>Quay lại
        </Link>
        <h1 className="text-left font-bold text-4xl pt-3">
          Xem lại thông tin của bạn
        </h1>
        <div>
          <div className="grid md:grid-cols-2 gap-3">
            <p>Ho và tên: {patient_info.full_name}</p>
            <p>Giới tính: {patient_info.gender}</p>
            <p>Số điện thoại: {patient_info.phone_number}</p>
            <p>Ngày sinh: {patient_info.date_of_birth}</p>
          </div>
          <p className="pt-3">Địa chỉ: {patient_info.address}</p>
        </div>
        <div className="w-full h-0.5 bg-zinc-100"></div>
        <ValidateScreening/>
      </div>
    </div>
  );
}
