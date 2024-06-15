import Post from '../Pages/Post.js';
import Get from '../Pages/Get.js';
export interface Category {
    id: number;
    category_name: string;
    description:string;
}
export const defaultCategory: Category = {
    category_name: "",
    id: 0,
    description:""
};
type OnSuccessFetch = (data: Category[]) => void;
type onError = (error:any) => void;
export async function CreateCategory(formData: Category): Promise<void> {
    console.log(formData);
    await Post("category", "", formData);
}
export async function DeleteManyCategory(formData: Category[]): Promise<void> {
    const categoryIds = formData.map(category => category.id);
    await Post("categoryDelete", "", categoryIds);
}
export async function GetCategory( onSuccessFetch: OnSuccessFetch,onError:onError): Promise<void> {
    Get("category", "", onSuccessFetch,onError);
}
export async function DeleteCategory( id:number, onSuccessFetch: OnSuccessFetch,onError:onError): Promise<void> {
    Get("categoryDelete", id, onSuccessFetch,onError);
}

