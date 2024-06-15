import Post from '../Pages/Post.js';
import Get from '../Pages/Get.js';
export interface FormData {
    id: number;
    budget_name: string;
}
export const defaultBudget={
    budget_name: '',
    id: 0
}
type OnSuccessFetch = (data: FormData[]) => void;
type onError = (error:any) => void;
export async function SubmitBudgetMaster(formData: FormData): Promise<void> {
    await Post("budgetMaster", "", formData);
}

export async function DeleteBudgetMaster(rowData: FormData): Promise<void> {  
    await Post("budgetMasterDelete", "", rowData);
}
export async function editBudgetMaster(formData: FormData, iRowID:Number): Promise<void> {
    await Post("budgetMaster", iRowID, formData);
}
export async function GetBudgetAllMaster( onSuccessFetch: OnSuccessFetch,onError:onError): Promise<void> {
    Get("budgetMaster", "", onSuccessFetch,onError);
}
