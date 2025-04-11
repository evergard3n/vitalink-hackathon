import { AllAppointments, Patient } from "./definitions";

export async function getAllAppointments() {
  try {
    const response = await fetch(
      "http://localhost:8000/api/v1/appointments/?skip=0&limit=100",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Cant fetch all appointments");
    }
    const data: AllAppointments = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get all appointments");
  }
}

export async function getCurrentPatientInfo(patient_id: string) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/v1/patients/${patient_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Cant fetch all appointments");
    }
    const data: Patient = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to get patient info");
  }
}
