"use client";
import { useWebSocket } from "@/app/lib/wsContext";
import { ArrowLeftIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
/* eslint-disable react-hooks/exhaustive-deps */
export default function Page() {
  const [open, setOpen] = useState<boolean>(false);
  const chatbotFormData = useWebSocket()?.formContent;
  const [formFields, setFormFields] = useState({
    position: "",
    last: "",
    occasion: "",
    vadap: "",
    cangay: "",
    duration: "",
    spread: "",
  });
  useEffect(() => {
    if (!chatbotFormData) return;
    if (JSON.stringify(formFields) !== JSON.stringify(chatbotFormData)) {
      setFormFields(chatbotFormData.history);
    }
    if (chatbotFormData.symptom_details.previous_check) {
      router.push("/patients/create/history");
    }
  }, [chatbotFormData]);
  const router = useRouter();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
    router.push("/patients/create/history/family");
  }
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
        ></button>
        <Link
          href={"/patients/screening"}
          className="flex flex-row items-center gap-2"
        >
          <ArrowLeftIcon width={16} height={16}></ArrowLeftIcon>Quay lại
        </Link>
        <h1 className="md:text-4xl font-bold pt-4 mb-2">Tiền sử bệnh nhân</h1>
        <div className="bg-green-400 w-1/4 h-0.5 mb-4"></div>
        <p>Kiểm tra thông tin từ Chatbot</p>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col items-start w-full gap-4 mt-6 lg:overflow-y-auto lg:h-full lg:max-h-[700px]"
        >
          <label htmlFor="position">Các bệnh lý đã mắc trước đó?</label>
          <input
            type="text"
            name="position"
            id="position"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
            placeholder="VD: tiểu đường, tai biến,..."
            value={formFields?.position || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFormFields({ ...formFields, position: event.target.value });
            }}
          />
          <label htmlFor="last">
            Anh/chị đã từng thực hiện phẫu thuật bao giờ chưa? Nếu có thì ở vị
            trí nào?
          </label>
          <input
            type="text"
            name="last"
            id="last"
            value={formFields?.last || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFormFields({ ...formFields, last: event.target.value });
            }}
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
          />
          <label htmlFor="occasion">Anh chị có bị dị ứng gì không?</label>
          <input
            type="text"
            name="occasion"
            id="occasion"
            value={formFields?.occasion || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFormFields({ ...formFields, occasion: event.target.value });
            }}
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
          />
          <label htmlFor="vadap">Tiền sử dịch tễ gần đây của anh/chị?</label>
          <input
            type="text"
            name="vadap"
            id="vadap"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
            value={formFields?.vadap || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFormFields({ ...formFields, vadap: event.target.value });
            }}
          />
          <label htmlFor="cangay">
            Nếu anh/chị là nữ, tiền sử thai sản, kinh nguyệt của chị là gì?
          </label>
          <input
            type="text"
            name="cangay"
            id="cangay"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
            value={formFields?.cangay || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFormFields({ ...formFields, cangay: event.target.value });
            }}
          />
          <label htmlFor="duration">
            Tiền sử sử dụng rượu bia, chè, chất kích thích ( tần suất, lượng… )
            của anh/chị?
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formFields?.duration || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFormFields({ ...formFields, duration: event.target.value });
            }}
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
          />

          <label htmlFor="spread">
            Thói quen sinh hoạt, chế độ ăn của anh/chị?
          </label>
          <input
            type="text"
            id="spread"
            name="spread"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
            value={formFields?.spread || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFormFields({ ...formFields, spread: event.target.value });
              router.push("/patients/create/history/family");
            }}
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 transition-colors duration-150 ease-in w-fit px-4 py-2 text-white rounded-lg lg:ml-auto mt-auto"
          >
            Tiếp tục{" "}
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
