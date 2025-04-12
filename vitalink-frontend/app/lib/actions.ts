import { z } from "zod";
import { FormDataType } from "./formContext";

const PatientSchema = z.object({
  fullname: z.string(),
  gender: z.string(),
  date_of_birth: z.string(),
  ethnicity: z.string(),
  occupation: z.string(),
  address: z.string(),
  phone_number: z.string(),
  patient_id: z.number(),
});

export async function createAppointment(
  userId: number,
  formData: FormDataType
) {
  const departments = new Map<string, number>([
   [ "Khoa tim mạch", 1],
    ["Khoa Thần kinh", 2],
    ["Khoa Chỉnh hình", 3],
    ["Khoa Chản đoán hình ảnh", 4],
    ["Khoa Xét nghiệm", 5],
  ]);
  const { test_type_id, appointment_date, reason, department_id } =
    // AppointmentSchema.parse({
    //   test_type_id: formData.test_type_id,
    //   appointment_date: formData.appointment_date,
    //   reason: formData.reason,
    //   department_id: formData.reason,
    // });
    formData;
  const newAppointment = {
    patient_id: userId,
    doctor_id: 1,
    test_type_id: test_type_id[0],
    department_id: departments.get(department_id) || 1,
    location_id: 1,
    appointment_date: appointment_date,
    appointment_time: "09:00:00",
    reason: reason,
    status: "Pending",
    notes: "",
  };
  try {
    const response = await fetch("http://localhost:8000/api/v1/appointments/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAppointment),
    });

    if (!response.ok) {
      console.log(newAppointment);
      throw new Error("Some error happened and I dont know why.");
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post.");
  }
}

export async function createPatient(userId: string, formData: FormData) {
  const { fullname, gender, date_of_birth, address, phone_number } =
    PatientSchema.parse({
      fullname: formData.get("fullname"),
      gender: formData.get("gender"),
      date_of_birth: formData.get("dob"),
      address: formData.get("address"),
      phone_number: formData.get("phone"),
    });
  const newPatient = {
    patient_id: userId,
    fullname,
    gender,
    date_of_birth,
    ethnicity: "Vietnamese",
    occupation: "ehe",
    address,
    phone_number,
  };
  try {
    const response = await fetch("http://localhost:8000/api/v1/patients/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPatient),
    });

    if (!response.ok) {
      throw new Error("Some error happened and I dont know why.");
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Some error happened and I dont know why.");
  }
}
