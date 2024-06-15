import CategoryMasterForm from '../component/CategoryMasterForm';
import CategoryList from '../component/CategoryList';
import { Category,GetCategory,DeleteManyCategory } from '../Model/CategoryModel';
import { useState, useEffect } from 'react';
import BusyIndicator from '../component/BusyIndicator';
// loader
export function CategoryLoader() {
  return "test";
}
export default function CategoryPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [rowDatas, setData] = useState<Category[]>([]);
 
  const fetchData = () => {
    const onSuccessFetch = (data: Category[]) => {
      setData(data);
      setLoading(false);
    };
    const onError = (error: any) => {

    };
    setLoading(true);
    GetCategory(onSuccessFetch, onError);

  };


  const handleDelete = async (data:Category[]) => { 
   
    setLoading(true);
    await DeleteManyCategory(data);
    fetchData();
      setLoading(false);
   
  }
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <BusyIndicator />;
  }
  return (
    <>
      <CategoryMasterForm fetchData={fetchData}/>
      <CategoryList rowData={rowDatas} onDelete={handleDelete}  />
    </>
  );

}
