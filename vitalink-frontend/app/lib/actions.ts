import {z} from "zod"

const PatientSchema = z.object({
    fullname: z.string(),
    gender: z.string(),
    date_of_birth: z.string(),
    ethnicity: z.string(),
    occupation: z.string(),
    address: z.string(),
    phone_number: z.string(),
    patient_id: z.number()
})

const AppointmentSchema = z.object({
    patient_id: z.number(),
    doctor_id: z.number(),
    test_type_id: z.number(),
    department_id: z.number(),
    location_id: z.number(),
    appointment_date: z.string(),
    appointment_time: z.string(),
    reason: z.string(),
    status: z.string(),
    notes: z.string(),
})

export async function createAppointment(userId: string, formData: FormData) {
    const {test_type_id, appointment_date, reason, department_id} = AppointmentSchema.parse({
        test_type_id : formData.get("test_type"),
        appointment_date : formData.get("appointment_date"),
        reason: formData.get("reason"),
        department_id: formData.get("department"),
    }) 
}