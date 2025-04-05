'use client'
import { useState } from "react";

export default function SearchableDropdown() {
  const options = ["Nam", "Nữ", "Khác", "Không muốn tiết lộ"];
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-64">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
          
        }}
        id="chuyenkhoa"
        name="chuyenkhoa"
        onFocus={() => setIsOpen(true)}
        className="w-full h-10 bg-zinc-100 rounded-sm pl-2"
        placeholder="Chọn chuyên khoa..."
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white border border-zinc-200 rounded-lg shadow-md">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="px-2 py-1 hover:bg-zinc-100 cursor-pointer"
              onClick={() => {
                setSearch(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
