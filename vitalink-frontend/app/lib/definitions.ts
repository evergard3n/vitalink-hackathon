export interface Chat {
    message: string;
    sender: string;
}

export interface FormContents {
    id: string,
    name: string,
    dob: string,
    gender: string,
    phone: string,
    province: string,
    district: string,
    ward: string,
    address: string,
    department: string,
    symptoms: string,
    validated: boolean,
    dateCreated: string,
    cccd: string,
}

export interface Appointment {
    appointment_id: number,
    created_at: string,
    updated_at: string,
    patient_id: number,
    doctor_id: number,
    test_type_id: number,
    department_id: number,
    location_id: number,
    appointment_date: string,
    appointment_time: string,
    reason: string,
    status: string,
    notes: string
}
export interface AllAppointments {
    total: number,
    items: Appointment[]
}

export interface Patient {
    patient_id: number,
    full_name: string,
    gender: string,
    date_of_birth: string,
    ethnicity: string,
    occupation: string,
    address: string,
    phone_number: string,
    created_at: string,
    updated_at: string
}

export interface Test {
    "test_name" : string,
    "preparation_instructions" : string,
    "contraindication_description" : string,
    "duration_minutes" : string,
    "price" : string,
    "default_location_id" : number,
    "department_id" : number,
    "test_type_id" : number,
    "created_at" : string,
    "updated_at" : string
}
export interface AllTest {
    total: number,
    items: Test[]
}