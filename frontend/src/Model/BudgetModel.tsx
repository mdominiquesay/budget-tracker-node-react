import Post from '../Pages/Post.js';
import Get from '../Pages/Get.js';
interface FormData {
    id: number;
    budget_name: string;
}
type OnSuccessFetch = (data: FormData[]) => void;
type onError = (error:any) => void;
export async function SubmitBudgetMaster(formData: FormData): Promise<void> {
    await Post("budgetMaster", "", formData);
}

export async function DeleteBudgetMaster(rowData: FormData): Promise<void> {  
    await Post("budgetMasterDelete", "", rowData);
}

export async function GetBudgetAllMaster( onSuccessFetch: OnSuccessFetch,onError:onError): Promise<void> {
    Get("budgetMaster", "", onSuccessFetch,onError);
}

