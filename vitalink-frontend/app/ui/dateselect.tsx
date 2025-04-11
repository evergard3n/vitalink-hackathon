"use client";

import { useState } from "react";
import { useFormContext } from "../lib/formContext";
import { useRouter } from "next/navigation";

const availableDates = [
  new Date("2025-04-14").toISOString(),
  new Date("2025-04-15").toISOString(),
  new Date("2025-04-16").toISOString(),
  new Date("2025-04-17").toISOString(),
  new Date("2025-04-18").toISOString(),
];


export default function DateSelector() {
    const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const formDataContext = useFormContext();
  function handleClick() {
    formDataContext?.updateFormData({
      appointment_date: selectedDate,
    });
    router.push('validate')
  }
  return (
    <div className="grow flex flex-col h-full gap-8 lg:gap-0">
      <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableDates.map((date, index) => {
          return (
            <li
              key={index}
              className={`border border-zinc-200 rounded-lg py-2 px-4  cursor-pointer flex items-center justify-center h-fit min-h-24 text-lg ${
                selectedDate === date
                  ? "bg-black text-white hover:bg-black"
                  : "bg-white hover:bg-zinc-200"
              }`}
              onClick={() => setSelectedDate(date)}
            >
              {new Date(date).toLocaleDateString("vi-VN")}
            </li>
          );
        })}
      </ol>
      <button
        type="submit"
        disabled={!selectedDate}
        onClick={handleClick}
        className={`bg-blue-500 hover:bg-blue-400 transition-colors duration-150 ease-in w-fit px-4 py-2 text-white rounded-lg lg:ml-auto mt-auto disabled:cursor-not-allowed disabled:bg-zinc-400`}
      >
        Tiếp tục{" "}
      </button>
    </div>
  );
}
