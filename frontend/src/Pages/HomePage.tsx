import BudgetDialog from './Dialog';
import { useState, useEffect, ChangeEvent } from 'react';
import { GetBudgetAllMaster, SubmitBudgetMaster, DeleteBudgetMaster } from "../Model/BudgetModel";
import { useNavigate } from 'react-router-dom';
import GetData from '../component/GetData';
import BudgetMasterForm from '../component/BudgetMasterForm';
import BusyIndicator from '../component/BusyIndicator';

interface DialogDetails {
    Button: string;
    Title: string;
    Body: JSX.Element; 
    Close: string;
    Save: string;
    
}
interface FormData {
    id: number;
    budget_name: string;
}

export default function HomePage() {
    const navigate = useNavigate();
    const [details, setDetails] = useState<DialogDetails>({
        Button: "New Budget",
        Title: "Budget Name",
        Body: <h1>Body</h1>,
        Close: "Close",
        Save: "Save"
    });
    const [loading,setLoading]=useState<boolean>(false);
    
    const [formData, setFormData] = useState<FormData>({
        budget_name: '',
        id: 0
    });
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
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const updatedFormData = { ...formData, budget_name: value };
        setFormData(updatedFormData);
    };
    useEffect(() => {
        const updateBody = () => {
            setDetails(prevDetails => ({
                ...prevDetails,
                Body: <BudgetMasterForm budget_name={formData.budget_name} handleChange={handleChange}/>
            }));
        };
        updateBody();
        // eslint-disable-next-line
    }, [formData]); 
    const handleSubmit = async () => {
        setLoading(true);
        await SubmitBudgetMaster(formData);
        fetchData();
        handleClose();
    };
    const handleDelete = async (rowData: FormData) => {
        setLoading(true);
        await DeleteBudgetMaster(rowData);
        fetchData();
    };
    const handleNavigate = (path: string) => {
        navigate(path);;
   };
   const handleClose=  () => {
    setFormData({
        budget_name: '',
        id: 0
    });
   }
   if (loading) {
        return <BusyIndicator/>;
    }
    return (
        <>
            <div className="clipping-container">
                <BudgetDialog DialogDetails={details}
                    onSubmit={handleSubmit}
                    onClose={handleClose}
                />
            </div>
            <GetData data={data} onDelete={handleDelete} onNavigate={handleNavigate} />
        </>
    );
}
