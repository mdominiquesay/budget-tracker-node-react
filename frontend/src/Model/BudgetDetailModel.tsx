import Post from '../Pages/Post.js';
import Get from '../Pages/Get.js';
interface FormData {
    budget_id: number;
    description: string;
    category: string;
}
type OnSuccessFetch = (data: FormData[]) => void;
type onError = (error:any) => void;

export async function CreateBudgetMaster(sRecordId:Number,formData: FormData): Promise<void> {
    await Post("budget", sRecordId, formData);
}
export async function DeletBudgetDetail(sRecordId:Number): Promise<void> {  
    await Post("budgetDelete", sRecordId, {});
}
export async function editBudgetMaster(sRecordId:Number,formData: FormData): Promise<void> {
    await Post("budgetUpdate", sRecordId, formData);
}
export async function GetAllBudgetDetail(sRecordId:Number, onSuccessFetch: OnSuccessFetch,onError:onError): Promise<void> {
    Get("budget",sRecordId, onSuccessFetch,onError);
}


