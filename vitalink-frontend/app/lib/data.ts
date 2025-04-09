import { AllAppointments } from "./definitions";

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
    throw new Error('Failed to get all appointments');
  }
}
