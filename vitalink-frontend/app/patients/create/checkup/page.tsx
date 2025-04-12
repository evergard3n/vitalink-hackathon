'use client'
import { useFormContext } from "@/app/lib/formContext";
import { useRouter } from "next/navigation";
import SuggestedTestTable from "@/app/ui/departments and checkup/suggestedTestTable";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

/* eslint-disable @typescript-eslint/no-unused-vars */
const departments: string[] = [
  "Khoa Tai mũi họng",
  "Khoa Tim mạch",
  "Khoa Tâm lý - Tâm thần",
];
export default function Page() {
  const formContent = useFormContext();
  
  const router = useRouter()
  function handleClick() {
    formContent?.updateFormData({
      test_type_id: [1,2,3],
    })
    console.log(formContent?.formData)
    router.replace('/patients/create/date-select')
  }
  return (
    <div className="p-4 rounded-lg overflow-hidden grow h-full">
      <div className="w-full h-full bg-white rounded-lg p-8 border-4 border-zinc-100 flex flex-col gap-4">
        <Link
          href={"/patients/create/history/family"}
          className="flex flex-row items-center gap-2"
        >
          <ArrowLeftIcon width={16} height={16}></ArrowLeftIcon>Quay lại
        </Link>
        {/* <h1 className="text-left font-bold text-4xl">Chuyên khoa đề xuất</h1>

        <p>
          Dựa trên triệu chứng và yêu cầu của bạn, đây là các chuyên khoa bạn
          nên tới khám:
        </p>
        <EditDepartments departments={departments}></EditDepartments> 
        <div className="w-full h-0.5 bg-zinc-100"></div>
        */}
        
        <h1 className="text-left font-bold text-4xl pt-4">
          Các xét nghiệm đề xuất
        </h1>

        <p>
          Dựa trên triệu chứng và yêu cầu của bạn, đây là các xét nghiệm bạn có thể cần phải
          thực hiện:
        </p>
        {/* <EditCheckups
          checkups={["Công thức máu toàn phần"]}
        /> */}
        <SuggestedTestTable test_type_id={[1,2,3]}/>
      
        <button onClick={handleClick}  className="bg-blue-500 hover:bg-blue-400 transition-colors duration-150 ease-in w-fit px-4 py-2 text-white rounded-lg ml-auto mt-auto">
            Tiếp tục
        </button>
      </div>
    </div>
  );
}
