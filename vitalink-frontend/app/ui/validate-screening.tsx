"use client";
import { createAppointment } from "../lib/actions";
import { FormDataType, useFormContext } from "../lib/formContext";
export default function ValidateScreening() {
  const formContext = useFormContext();
  function handleClick() {
    const finalForm : FormDataType = {
      test_type_id: formContext?.formData.test_type_id || [],
      appointment_date: formContext?.formData.appointment_date || "",
      reason: formContext?.formData.reason || "",
      department_id: formContext?.formData.department_id || "",
    }
    createAppointment(1, finalForm);
  }
  return (
    <div className="flex flex-col justify-center h-full">
      <div className="grow">
        <p className="font-semibold">Triệu chứng:</p>
        <p>{formContext?.formData.reason}</p>
        <p>Tức lồng ngực</p>
        <p className="font-semibold">Xét nghiệm cần thực hiện:</p>
        <p>{formContext?.formData.test_type_id}</p>
        <p className="font-semibold">Chuyên khoa:</p>
        <p>{formContext?.formData.department_id}</p>
        <p className="font-semibold">Ngày hẹn khám:</p>
        <p>{new Date(formContext?.formData.appointment_date || "").toLocaleDateString("vi-VN")}</p>
      </div>
      <button
        type="submit"
        onClick={handleClick}
        className={`bg-blue-500 hover:bg-blue-400 transition-colors duration-150 ease-in w-fit px-4 py-2 text-white rounded-lg lg:ml-auto mt-auto disabled:cursor-not-allowed disabled:bg-zinc-400`}
      >
        Tiếp tục
      </button>
    </div>
  );
}
