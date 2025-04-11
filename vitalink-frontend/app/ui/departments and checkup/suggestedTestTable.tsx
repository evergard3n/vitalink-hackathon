'use client'
import { getAllTests } from "@/app/lib/data";
import { AllTest } from "@/app/lib/definitions";
import { useEffect, useState } from "react";

export default function SuggestedTestTable({
  test_type_id,
}: {
  test_type_id: number[];
}) {
    const [allTests, setAllTest] = useState<AllTest>({total: 0, items: []});
  useEffect( () => {
    const fetchData = async () => {
        const allTests = await getAllTests();
        setAllTest(allTests);
    }
    if(allTests.items.length === 0){
        fetchData();
    }
  },[])
  const selectedTests = allTests.items.filter((test) =>
    test_type_id.includes(test.test_type_id)
  );
  return (
    <ol className="lg:w-full min-w-300">
        <div className="grid grid-cols-4 border border-zinc-200">
            <p className="font-semibold border-r border-zinc-200 px-2">Tên xét nghiệm</p>
            <p className="font-semibold border-r border-zinc-200 px-2">Giá</p>
            <p className="font-semibold border-r border-zinc-200 px-2">Chuẩn bị</p>
            <p className="font-semibold border-r border-zinc-200 px-2">Chống chỉ định</p>
        </div>
      {selectedTests.map((test, index) => (
        <li key={index} className="grid grid-cols-4 border-b border-zinc-200 border-l border-r py-2">
          <p className="border-r border-zinc-200 px-2">
            {test.test_name}
          </p>
          <p className="border-r border-zinc-200 px-2">
            {test.price}
          </p>
          <p className="border-r border-zinc-200 px-2">
            {test.preparation_instructions}
          </p>
          <p className="border-r border-zinc-200 px-2">
            {test.contraindication_description}
          </p>
        </li>
      ))}
    </ol>
  );
}
