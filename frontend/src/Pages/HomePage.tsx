import { useState, useEffect } from 'react';
import { FormData,GetBudgetAllMaster,  DeleteBudgetMaster} from "../Model/BudgetModel";
import { useNavigate } from 'react-router-dom';
import GetData from '../component/GetData';
import BudgetMasterForm from '../component/BudgetMasterForm';
import BusyIndicator from '../component/BusyIndicator';


// loader
export function HomePageLoader() {
    return "";
}
export default function HomePage() {
    const navigate = useNavigate();
    
    const [loading,setLoading]=useState<boolean>(false);
    
    
    const [data, setData] = useState<FormData[]>([]);
    const fetchData =  () => {
        const onSuccessFetch = (data: FormData[]) => {
            setData(data);
            setLoading(false);
        };
        const onError = (error:any) => {
            
        };
        setLoading(true);
        GetBudgetAllMaster(onSuccessFetch,onError);
        
    };
    useEffect(() => {
        fetchData();
    }, []); 

    
    const handleDelete = async (rowData: FormData) => {
        setLoading(true);
        await DeleteBudgetMaster(rowData);
        fetchData();
    };
    const handleNavigate = (path: string) => {
        navigate(path);
   };
   
   if (loading) {
        return <BusyIndicator/>;
    }
    return (
        <>
            <BudgetMasterForm fetchData={fetchData}/>
            <GetData data={data} onDelete={handleDelete} onNavigate={handleNavigate} />
        </>
    );
    
}
