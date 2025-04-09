import { getAllAppointments } from "../lib/data"
import { AllAppointments } from "../lib/definitions"

export default async function Page() {
    const data: AllAppointments = await getAllAppointments()
    return (
        <div>
            <h1>Admin</h1>
            <p>{data.total}</p>
        </div>
    )
}