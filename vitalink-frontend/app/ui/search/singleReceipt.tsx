import { FormContents } from "@/app/lib/definitions";

export default function SingleReceipt({form}: {form: FormContents}) {
    return (
        <div className="w-full h-fit py-2 border border-zinc-200 rounded-lg  bg-linear-to-br from-white to-zinc-50 flex flex-col items-start gap-4 px-4">
            <h1 className="font-bold text-2xl border-b border-zinc-200 w-full">Phiếu #{form.id}</h1>
            <p>Chuyên khoa: {form.chuyenkhoa}</p>
            <p>Ngày tạo: {form.dateCreated}</p>
            
            <p>Trạng thái: {form.validated ? (<span className="text-green-500">Đã được duyệt</span>) : "Đang chờ duyệt"}</p>
        </div>
    )
}