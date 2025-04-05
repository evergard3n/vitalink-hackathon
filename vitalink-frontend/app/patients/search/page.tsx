import { formContentsPlaceholder } from "@/app/lib/placeholder"
import SingleReceipt from "@/app/ui/search/singleReceipt";

export default function Page() {
    const data = formContentsPlaceholder;
    return(
        <div >
            <ol className="grid grid-cols-4 w-full gap-3">
                {data.map((form,index)=> (<li key={index}><SingleReceipt form={form} /></li>))}
            </ol>
        </div>
    )
}