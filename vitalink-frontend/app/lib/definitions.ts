export interface Chat {
    id: string;
    message: string;
    sender: string;
    timestamp: string;
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