'use client'

import { useFormContext } from "../lib/formContext"

export default function DateSelector() {
    const formDataContext = useFormContext()
    return (
        <div>
            <p className="bg-black text-white">p{formDataContext?.formData.department_id}</p>
            hello
        </div>
    )
}