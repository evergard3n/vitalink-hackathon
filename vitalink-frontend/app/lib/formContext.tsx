// lib/FormContext.js
'use client'
import { createContext, useContext, useState } from "react";

export interface FormDataType {
    test_type_id: string;
    appointment_date: string;
    reason: string;
    department_id: string;
  }
interface FormContextType {
    formData: FormDataType,
    updateFormData : (formData: Partial<FormDataType>) => void
}
const FormContext = createContext<FormContextType | undefined>(undefined);



export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormDataType>({
    test_type_id: "",
    appointment_date: "",
    reason: "",
    department_id: "",
  });

  const updateFormData = (data: Partial<FormDataType>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
    console.log(formData)
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}
