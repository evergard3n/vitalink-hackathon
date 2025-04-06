'use client'
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter()
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
    router.push("/patients/create/checkup");
  }
  return (
    <div className="p-4 rounded-lg overflow-hidden grow h-full">
      <div className="w-full h-full bg-white drop-shadow-sm rounded-lg p-8 border-8 border-zinc-100 flex flex-col">
        <Link
          href={"/patients/create"}
          className="flex flex-row items-center gap-2"
        >
          <ArrowLeftIcon width={16} height={16}></ArrowLeftIcon>Quay lại
        </Link>
        <h1 className="md:text-4xl font-bold pt-4 mb-2">Thông tin sàng lọc</h1>
        <div className="bg-green-400 w-1/4 h-0.5 mb-4"></div>
        <p>Vui lòng trả lời đầy đủ các câu hỏi dưới đây.</p>
        <form action="" onSubmit={handleSubmit} className="flex flex-col items-start w-full gap-4 mt-6">
          <label htmlFor="position">Vị trí xuất hiện cơn đau?</label>
          <input
            type="text"
            name="position"
            id="position"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
            placeholder="VD: đau nửa đầu phía sau, bụng dưới,..."
          />
          <label htmlFor="last">
            Từ lúc xuất hiện cơn đau đầu tiên đến giờ, cơn đau có tăng lên hay
            không?
          </label>
          <input
            type="text"
            name="last"
            id="last"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
            placeholder="VD: Có"
          />
          <label htmlFor="occasion">
            Cơn đau đột ngột xuất hiện hay xuất hiện từ từ?
          </label>
          <input
            type="text"
            name="occasion"
            id="occasion"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
            placeholder="VD: Đột ngột xuất hiện"
          />
          <label htmlFor="vadap">
            Trước đó vị trí bị đau có bị va đập vào đâu hay chịu tác động mạnh
            gì không?
          </label>
          <input
            type="text"
            name="vadap"
            id="vadap"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
            placeholder="VD: đau nửa đầu phía sau, bụng dưới,..."
          />
          <label htmlFor="cangay">
            Cơn đau của anh như thế nào. Ví dụ như đau liên tục cả ngày hơn đau
            thành từng cơn?
          </label>
          <input
            type="text"
            name="cangay"
            id="cangay"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
            placeholder="VD: Từng cơn."
          />
          <label htmlFor="duration">Mỗi cơn đau kéo dài khoảng bao lâu?</label>
          <input
            type="text"
            id="duration"
            name="duration"
            placeholder="Ví dụ: 3-4 phút"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
          />

          <label htmlFor="spread">
            Cơn đau có lan đi đâu không hay chỉ ở nguyên vị trí?
          </label>
          <input
            type="text"
            id="spread"
            name="spread"
            placeholder="Ví dụ: Lan xuống gáy"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
          />

          <label htmlFor="relief">
            Anh/chị thường làm gì để giảm đau khi cơn đau xuất hiện?
          </label>
          <input
            type="text"
            id="relief"
            name="relief"
            placeholder="Ví dụ: Ngồi nghỉ một lúc"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
          />

          <label htmlFor="medication">
            Có sử dụng thuốc giảm đau nào không?
          </label>
          <input
            type="text"
            id="medication"
            name="medication"
            placeholder="Ví dụ: Paracetamol, nhưng không đỡ"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
          />

          <label htmlFor="time">
            Cơn đau thường xuất hiện vào thời gian nào trong ngày?
          </label>
          <input
            type="text"
            id="time"
            name="time"
            placeholder="Ví dụ: Chiều tối sau khi đi làm về"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
          />

          <label htmlFor="trigger">Có yếu tố nào làm tăng cơn đau không?</label>
          <input
            type="text"
            id="trigger"
            name="trigger"
            placeholder="Ví dụ: Không có"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
          />

          <label htmlFor="pain_level">
            Đánh giá mức độ đau trên thang điểm từ 1 đến 10?
          </label>
          <input
            type="number"
            id="pain_level"
            name="pain_level"
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
            placeholder="Ví dụ: Chưa đi khám"
            className="w-full bg-zinc-200 h-fit min-h-12 rounded-md px-2"
          />
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
