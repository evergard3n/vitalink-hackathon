"use client";
import { useWebSocket } from "@/app/lib/wsContext";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [open, setOpen] = useState<boolean>(false);
  const chatbotFormData = useWebSocket()?.formContent;
  const [formFields, setFormFields] = useState({
    site: "",
    onset: "",
    character: "",
    radiation: "",
    alleviating: "",
    timing: "",
    exacerbating: "",
    severity: "",
    previous_check: "",
  });
  const router = useRouter();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
    router.push("/patients/create/history");
  }
  useEffect(() => {
    if (!chatbotFormData) return;
    if (JSON.stringify(formFields) !== JSON.stringify(chatbotFormData)) {
      setFormFields(chatbotFormData.symptom_details);
    }
    if(chatbotFormData.symptom_details.previous_check) {
      router.push("/patients/create/history")
    }
  }, [chatbotFormData]);
  return (
    <div
      className={`p-4 rounded-lg overflow-hidden grow h-full ${
        open ? "lg:w-full" : "lg:w-12 lg:bg-zinc-100"
      } transition-all duration-100 ease-in`}
    >
      <div
        className={`w-full h-full relative bg-white drop-shadow-sm rounded-lg p-8 border-8 border-zinc-100 flex flex-col ${
          open ? "" : "lg:hidden"
        }`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute z-50 top-14 right-12 flex flex-row px-4 py-2 gap-2 rounded-full hover:bg-zinc-200"
        >
          Ẩn <ArrowRightIcon width={24} height={24}></ArrowRightIcon>
        </button>
        <Link
          href={"/patients/create"}
          className="flex flex-row items-center gap-2"
        >
          <ArrowLeftIcon width={16} height={16}></ArrowLeftIcon>Quay lại
        </Link>
        <h1 className="md:text-4xl font-bold pt-4 mb-2">Bệnh sử</h1>
        <div className="bg-green-400 w-1/4 h-0.5 mb-4"></div>
        <p>Kiểm tra thông tin từ Chatbot</p>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col items-start w-full gap-4 mt-6 lg:overflow-y-auto lg:h-full lg:max-h-[700px]"
        >
          <label htmlFor="position">Vị trí xuất hiện cơn đau?</label>
          <input
            type="text"
            name="position"
            id="position"
            value={formFields?.site || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFormFields({ ...formFields, site: event.target.value });
            }}
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
            placeholder="VD: đau nửa đầu phía sau, bụng dưới,..."
          />
          <label htmlFor="last">
            Thời điểm khởi phát triệu chứng
          </label>
          <input
            type="text"
            name="last"
            id="last"
            value={formFields?.onset || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFormFields({ ...formFields, onset: event.target.value });
            }}
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
            placeholder="VD: Có"
          />
          <label htmlFor="occasion">
            Tính chất của triệu chứng? (kéo dài hay theo từng cơn)
          </label>
          <input
            type="text"
            name="occasion"
            id="occasion"
            value={formFields?.character || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFormFields({ ...formFields, character: event.target.value });
            }}
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
            placeholder="VD: Đột ngột xuất hiện"
          />
          <label htmlFor="vadap">
            Triệu chứng đó có lan tỏa hay kèm theo triệu chứng nào khác không
          </label>
          <input
            type="text"
            name="vadap"
            id="vadap"
            value={formFields?.radiation || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFormFields({ ...formFields, radiation: event.target.value });
            }}
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
            placeholder="VD: đau nửa đầu phía sau, bụng dưới,..."
          />
          <label htmlFor="cangay">
            Yếu tố làm giảm triệu chứng của anh/chị?
          </label>
          <input
            type="text"
            name="cangay"
            id="cangay"
            value={formFields?.alleviating || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFormFields({ ...formFields, alleviating: event.target.value });
            }}
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
            placeholder="VD: Từng cơn."
          />

<label htmlFor="timing">
            Thời gian và tần suất triệu chứng?
          </label>
          <input
            type="text"
            id="timing"
            name="timing"
            value={formFields?.timing|| ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFormFields({ ...formFields, timing: event.target.value });
            }}
            placeholder="Ví dụ: 5"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
          />

<label htmlFor="pain_level">
            Đánh giá mức độ đau trên thang điểm từ 1 đến 10?
          </label>
          <input
            type="number"
            id="pain_level"
            name="pain_level"
            value={formFields?.severity || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFormFields({ ...formFields, severity: event.target.value });
            }}
            min="1"
            max="10"
            placeholder="Ví dụ: 5"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
          />

          <label htmlFor="previous_check">
            Trước khi đến đây, anh/chị đã đi khám ở đâu chưa?
          </label>
          <input
            type="text"
            id="previous_check"
            name="previous_check"
            value={formFields?.previous_check || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFormFields({ ...formFields, previous_check: event.target.value });
              router.push("/patients/create/history");
            }}
            placeholder="Ví dụ: Chưa đi khám"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 transition-colors duration-150 ease-in w-fit px-4 py-2 text-white rounded-lg lg:ml-auto mt-auto"
          >
            Tiếp tục
          </button>
        </form>
      </div>
      {!open && (
        <button
          className="mt-11 -mx-2 p-2 rounded-full hover:bg-zinc-200"
          onClick={() => setOpen(true)}
        >
          <DocumentTextIcon width={24} height={24} />
        </button>
      )}
    </div>
  );
}
