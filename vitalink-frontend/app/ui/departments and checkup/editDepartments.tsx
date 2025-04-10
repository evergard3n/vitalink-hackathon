"use client";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import SearchableDropdown from "../form/chuyenkhoa";
import { useFormContext } from "@/app/lib/formContext";

export default function EditDepartments({
  departments,
}: {
  departments: string[];
}) {
  const formDataContext = useFormContext();
  const [open, setOpen] = useState<boolean>(false);
  const [dep, setDep] = useState<string[]>(departments);
  useEffect(() => {
    formDataContext?.updateFormData({
      department_id: dep[0],
    });
  }, []);
  function handleDelete(index: number) {
    setDep(dep.filter((_, i) => i !== index));
  }
  function handleAddNewDept(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (event.currentTarget.chuyenkhoa.value) {
      const formData = new FormData(event.currentTarget);
      const newDept = formData.get("chuyenkhoa") as string;
      setDep([...dep, newDept]);
    }
  }
  function handleSubmit() {
    formDataContext?.updateFormData({
      department_id: dep[0],
    });
    setOpen(false);
  }
  function handleClose() {
    setDep(departments);
    setOpen(false);
  }
  return (
    <div>
      <ol className="grid grid-cols-3 gap-4 pt-4">
        {dep.map((department, index) => (
          <li
            key={index}
            className="border border-zinc-200 rounded-lg h-fit min-h-18 flex items-center justify-center font-bold text-xl"
          >
            {department}
          </li>
        ))}
        <li className="border border-zinc-200 rounded-lg h-fit min-h-18 flex items-center justify-center text-md gap-2 bg-black text-white hover:bg-linear-to-r hover:from-black hover:to-zinc-600 hover:drop-shadow-md transition-colors duration-150 ease-in">
          <button
            className="flex items-center gap-2"
            onClick={() => setOpen(true)}
          >
            <PencilIcon width={16} height={16} className=""></PencilIcon>Thêm
            hoặc chỉnh sửa
          </button>
        </li>
      </ol>
      {open && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-30  backdrop-blur-2xl">
          <div className="w-1/3 h-fit min-h-1/3 bg-white rounded-lg border-6 drop-shadow-sm border-zinc-100 p-4">
            <h1 className="text-center text-2xl font-bold">
              Chỉnh sửa chuyên khoa
            </h1>
            <ol className="grid lg:grid-cols-2 gap-4 pt-4">
              {dep.map((department, index) => (
                <li
                  key={index}
                  className="border border-zinc-200 rounded-md h-fit overflow-hidden max-h-22 min-h-18 flex items-center justify-between font-bold text-md "
                >
                  <p className="mx-auto px-2">{department}</p>
                  <button
                    className="w-12 hover:w-18 transition-all duration-150 ease-in h-68 bg-red-700"
                    onClick={() => handleDelete(index)}
                  >
                    <TrashIcon
                      width={32}
                      height={24}
                      className="text-white mx-auto"
                    ></TrashIcon>
                  </button>
                </li>
              ))}
            </ol>
            <p className="py-4">Thêm chuyên khoa theo yêu cầu:</p>
            <form
              action=""
              onSubmit={handleAddNewDept}
              className="flex flex-row gap-1"
            >
              <SearchableDropdown
                options={[
                  "Khoa tim mạch",
                  "Khoa Thần kinh",
                  "Khoa Chỉnh hình",
                  "Khoa Chẩn đoán hình ảnh",
                  "Khoa Xét nghiệm",
                ]}
              />
              <button
                type="submit"
                className="px-4 py-2 w-fit h-10 border border-zinc-200  hover:bg-zinc-200 rounded-lg transition-colors duration-150 ease-in"
              >
                Thêm
              </button>
            </form>
            <div className="flex flex-row items-center justify-end gap-2 pt-4">
              <button
                onClick={handleClose}
                className="px-4 py-2 w-fit h-10 border border-zinc-200 hover:bg-zinc-200 rounded-lg transition-colors duration-150 ease-in"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 w-fit h-10 border border-zinc-200 bg-blue-500 hover:bg-blue-600 transition-colors duration-150 ease-in text-white rounded-lg"
              >
                Ghi nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
