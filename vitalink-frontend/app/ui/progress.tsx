'use client'
import { usePathname } from "next/navigation"
const progresses = [
    {
        path: '/patients/create',
        name: 'Điền thông tin cá nhân'
    },
    {
        path: '/patients/create/screening',
        name: 'Trả lời câu hỏi sàng lọc'
    },
    {
        path: '/patients/create/checkup',
        name: 'Xem lại các chuyên khoa và xét nghiệm cần thực hiện'
    },
    {
        path: '/patients/create/date-select',
        name: 'Đặt lịch hẹn khám'
    }
]
export default function Progress() {
    const path = usePathname()
    return (
        <div>
            <ol>
                {progresses.map((progress,index) => {
                    return (
                        <li key={index} className={path === progress.path ? 'text-black font-semibold' : 'text-zinc-500'}>
                            {progress.name}
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}