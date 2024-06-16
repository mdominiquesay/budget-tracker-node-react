import CategoryMasterForm from '../component/CategoryMasterForm';
import { Category,GetCategory,DeleteManyCategory,visibleFields,requiredFields } from '../Model/CategoryModel';
import { useState, useEffect ,useCallback} from 'react';
import BusyIndicator from '../component/BusyIndicator';
import SmartTable from "../component/SmartTable";
// loader
export function CategoryLoader() {
  return "test";
}
export default function CategoryPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [rowDatas, setData] = useState<Category[]>([]);
  
  const [tableDetails, setDetails] = useState<any>(
    {
      requiredFields:requiredFields,
      visibleField:visibleFields
    });

    const fetchData = useCallback(() => {
    const onSuccessFetch = (data: Category[]) => {
      setData(data);
      setLoading(false);
    };
    const onError = (error: any) => {

    };
    setLoading(true);
    GetCategory(onSuccessFetch, onError,tableDetails);

  }, [tableDetails]);

  const handleDelete = async (data:Category[]) => {   
    setLoading(true);
    await DeleteManyCategory(data);
    fetchData();
      setLoading(false); 
  }
  useEffect(() => {
    fetchData();
  }, [tableDetails, fetchData]);

  const fetchMyData = (updatedDetails: any) => {
    setDetails(updatedDetails);
    fetchData();
  };

  if (loading) {
    return <BusyIndicator />;
  }
  
  return (
    <>
      <CategoryMasterForm fetchData={fetchData}/>
      <SmartTable details={tableDetails} rowData={rowDatas} mode="MultiSelect"
        fetchMyData={fetchMyData}
        onDelete={handleDelete}
        ></SmartTable>
    </>
  );

}
