"use client";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
    router.push("/patients/create/checkup");
  }
  const [pt, setPt] = useState<string>("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPt(e.target.value);
    if(pt === "next") {
      router.push("/patients/create/checkup");
    }
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
        >
          Ẩn <ArrowRightIcon width={24} height={24}></ArrowRightIcon>
        </button>{" "}
        <Link
          href={"/patients/create/screening"}
          className="flex flex-row items-center gap-2"
        >
          <ArrowLeftIcon width={16} height={16}></ArrowLeftIcon>Quay lại
        </Link>
        <h1 className="md:text-4xl font-bold pt-4 mb-2">Tiền sử gia đình</h1>
        <div className="bg-green-400 w-1/4 h-0.5 mb-4"></div>
        <p>Kiểm tra thông tin từ Chatbot</p>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col items-start w-full gap-4 mt-6"
        >
          <label htmlFor="ditruyen">
            Gia đình anh/chị có tiền sử bệnh nào có tính di truyền không?
          </label>
          <input
            type="text"
            name="ditruyen"
            id="ditruyen"
            value={pt}
            onChange={handleChange}
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
            placeholder="VD: đau nửa đầu phía sau, bụng dưới,..."
          />
          <label htmlFor="last">
            Xung quanh anh/chị có tiền sử bệnh nào có tính di truyền không?
          </label>
          <input
            type="text"
            name="last"
            id="last"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
            placeholder="VD: Có"
          />
          <label htmlFor="occasion">
            Gia đình anh/chị có ai mắc các bệnh lý nội khoa như: tăng huyết áp,
            đái tháo đường… không?
          </label>
          <input
            type="text"
            name="occasion"
            id="occasion"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
            placeholder="VD: Đột ngột xuất hiện"
          />
          <label htmlFor="vadap">
            Hàng xóm xung quanh có ai tiếp xúc với anh/chị mà có triệu chứng
            tương tự không?
          </label>
          <input
            type="text"
            name="vadap"
            id="vadap"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
            placeholder="VD: đau nửa đầu phía sau, bụng dưới,..."
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
