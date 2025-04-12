"use client";

import SearchableDropdown from "./chuyenkhoa";

import { useRouter } from "next/navigation";
import { useWebSocket } from "@/app/lib/wsContext";
import { useEffect, useState } from "react";
import { FormContents } from "@/app/lib/definitions";
/* eslint-disable @typescript-eslint/no-explicit-any */
function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer); // Xóa timer nếu giá trị thay đổi trước khi hết delay
    };
  }, [value, delay]);

  return debouncedValue;
}
export default function Form() {
  const router = useRouter();
  const chatbotFormData = useWebSocket()?.formContent;
  const sendFormData = useWebSocket()?.sendFormData;

  const [formFields, setFormFields] = useState<FormContents>({
    id: "",
    name: "",
    dob: "",
    gender: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    address: "",
    department: "",
    symptoms: "",
    validated: false,
    dateCreated: "",
    cccd: "",
  });
  const debouncedFormData = useDebounce(formFields, 500);


/* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!chatbotFormData) return;
    if (JSON.stringify(formFields) !== JSON.stringify(chatbotFormData)) {
      setFormFields(chatbotFormData.personal);
    }
  }, [chatbotFormData]);

  useEffect(() => {
    const cleanFormData = Object.fromEntries(
      Object.entries(debouncedFormData).filter(
        /* eslint-disable @typescript-eslint/no-unused-vars */
        ([_, value]) =>
          typeof value === "string" && value !== "" && value !== null
      )
    );
    if (cleanFormData && sendFormData) {
      sendFormData(cleanFormData);
    }
  }, [debouncedFormData]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
    router.push("/patients/create/checkup");
  }
  return (
    <div className="p-2 rounded-lg overflow-hidden grow h-full">
      <div className="w-full h-full bg-white drop-shadow-sm rounded-lg p-8 border-8 border-zinc-100 flex flex-col">
        <form
          onSubmit={handleSubmit}
          action=""
          className="flex flex-col gap-2 w-full grow"
        >
          <h1 className="text-left font-semibold text-4xl">
            Thông tin cá nhân 
          </h1>
          <div className="h-0.5 w-1/4 bg-green-400 mb-4"></div>
          <label htmlFor="name">Họ và tên <span className="text-red-700">*</span> </label>
          <input
            required
            type="text"
            id="name"
            value={formFields?.name ?? ""}
            placeholder="Nhập họ và tên"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              
              setFormFields({ ...formFields, name: event.target.value });
            }}
            className="w-full h-10 bg-zinc-100 rounded-sm pl-2"
          />

          <div className="grid md:grid-cols-3 w-full gap-4">
            <div className="flex flex-col gap-2 ">
              <label htmlFor="birth">Ngày sinh <span className="text-red-700">*</span> </label>
              <input
                type="text"
                id="birth"
                required
                placeholder ="Nhập ngày sinh"
                value={formFields?.dob ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  
                  setFormFields({ ...formFields, dob: event.target.value });
                }}
                className=" w-full h-10 bg-zinc-100 rounded-sm pl-2"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label htmlFor="myDropdown">Giới tính <span className="text-red-700">*</span></label>
              <select
                required
                id="myDropdown"
                value={formFields?.gender ?? ""}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  
                  setFormFields({ ...formFields, gender: event.target.value });
                }}
                className="w-full h-10 bg-zinc-100 rounded-sm pl-2"
              >
                <option value="" disabled hidden className="text-zinc-800">
                  Chọn giới tính
                </option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 ">
              <label htmlFor="phone">Số điện thoại <span className="text-red-700">*</span></label>
              <input
                id="phone"
                required
                placeholder="Nhập số điện thoại"
                type="text"
                value={formFields?.phone ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  
                  setFormFields({ ...formFields, phone: event.target.value });
                }}
                className="w-full h-10 bg-zinc-100 rounded-sm pl-2"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 w-full gap-4">
            <div className="flex flex-col gap-2 ">
              <label htmlFor="province">Tỉnh/Thành <span className="text-red-700">*</span></label>
              <input
                type="text"
                id="province"
                required
                placeholder="Nhập tình/thành"
                value={formFields?.province ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  
                  setFormFields({
                    ...formFields,
                    province: event.target.value,
                  });
                }}
                className=" w-full h-10 bg-zinc-100 rounded-sm pl-2"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label htmlFor="district">Quận/Huyện <span className="text-red-700">*</span></label>
              <input
                type="text"
                id="district"
                required
                placeholder="Nhập quán/huyện"
                value={formFields?.district ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  
                  setFormFields({
                    ...formFields,
                    district: event.target.value,
                  });
                }}
                className=" w-full h-10 bg-zinc-100 rounded-sm pl-2"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label htmlFor="ward">Xã/Phường <span className="text-red-700">*</span></label>
              <input
                type="text"
                id="ward"
                required
                placeholder="Nhập phường/xã"
                value={formFields?.ward ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  
                  setFormFields({ ...formFields, ward: event.target.value });
                }}
                className=" w-full h-10 bg-zinc-100 rounded-sm pl-2"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="address">Địa chỉ <span className="text-red-700">*</span></label>
              <input
                id="address"
                required
                type="text"
                placeholder="Nhập địa chỉ"
                value={formFields?.address ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  
                  setFormFields({ ...formFields, address: event.target.value });
                }}
                className=" w-full h-10 bg-zinc-100 rounded-sm pl-2"
              />
            </div>
            <div className="flex flex-col gap-2">
            <label htmlFor="address">Số CMTND/CCCD <span className="text-red-700">*</span></label>
            <input
              id="cccd"
              required
              placeholder="Nhập số CMTND/CCCD"
              type="text"
              value={formFields?.cccd ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                
                setFormFields({ ...formFields, cccd: event.target.value });
              }}
              className=" w-full h-10 bg-zinc-100 rounded-sm pl-2"
            />
            </div>
          </div>
          <h1 className="text-left font-semibold text-4xl pt-8 pb-2">
            Triệu chứng
          </h1>
          <div className="h-0.5 w-1/6 bg-green-400 mb-4"></div>
          <label>Chuyên khoa</label>
          <SearchableDropdown />
          <label htmlFor="trieuchung">Mô tả triệu chứng <span className="text-red-700">*</span></label>
          <textarea
            id="trieuchung"
            required
            className="min-h-30 border border-zinc-200 rounded-lg px-2 pt-2 resize-none"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 transition-colors duration-150 ease-in w-fit px-4 py-2 text-white rounded-lg lg:ml-auto mt-auto"
          >
            Tiếp tục{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
