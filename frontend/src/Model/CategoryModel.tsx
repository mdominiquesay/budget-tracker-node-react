import Post from '../Pages/Post.js';
import Get from '../Pages/Get.js';
export interface Category {
    id: number;
    category_name: string;
    description: string;
}
export const defaultCategory: Category = {
    category_name: "",
    id: 0,
    description: ""
};
export const visibleFields: any[] =[
        {
            value: "category_name"
        }
        ,
        {
            value: "description"
        }
    ]
    ;
    export const requiredFields: any[] =[
        {value: "id"},
        {value: "category_name"}
        ,
        {
            value: "description"
        }
    ]
    ;

type OnSuccessFetch = (data: Category[]) => void;
type onError = (error: any) => void;
export async function CreateCategory(formData: Category): Promise<void> {
    console.log(formData);
    await Post("category", "", formData);
}
export async function DeleteManyCategory(formData: Category[]): Promise<void> {
    const categoryIds = formData.map(category => category.id);
    await Post("categoryDelete", "", categoryIds);
}
export async function GetCategory(onSuccessFetch: OnSuccessFetch, onError: onError, details: any): Promise<void> {
    var select: string = "";
    var sort: string = "";
    details.requiredFields.map((field: any) => {
        if (select) {
            select += ",";
        }
        select += field.value;

    })
    details.visibleField.map((field: any) => {
        if (field.sort) {
            if (sort) {
                sort += ",";
            }

            sort += field.value;
            if (field.sort === "descending") {
                sort += " DESC";
            }
        }
    })
    var params = "";
    if (select) {
        params += "$select=" + select;
    }
    if (sort) {
        if (params) {
            params += "&";
        }

        params += "$sort=" + sort;
    }






    Get("category", "?" + params, onSuccessFetch, onError);
}
export async function DeleteCategory(id: number, onSuccessFetch: OnSuccessFetch, onError: onError): Promise<void> {
    Get("categoryDelete", id, onSuccessFetch, onError);
}

