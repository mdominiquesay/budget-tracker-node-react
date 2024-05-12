import BudgetDialog from './Dialog';
import { useState, useEffect, ChangeEvent } from 'react';
import Post from './Post.js';
import Get from './Get.js';
import { useNavigate } from 'react-router-dom';
import GetData from '../component/GetData';
import BudgetMasterForm from '../component/BudgetMasterForm';
import BusyIndicator from '../component/BusyIndicator';


interface DialogDetails {
    Button: string;
    Title: string;
    Body: JSX.Element; // Body should accept JSX.Element
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
        setLoading(true);
        Get("budgetMaster", "", onSuccessFetch);
        
    };
    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array to ensure this effect runs only once, equivalent to componentDidMount in class components


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        // Create a new object with updated data
        const updatedFormData = { ...formData, budget_name: value };
        // Set the state with the new object
        setFormData(updatedFormData);
    };
    
    // Function to update Body with a new JSX element
    
    useEffect(() => {
        const updateBody = () => {
            setDetails(prevDetails => ({
                ...prevDetails,
                Body: <BudgetMasterForm budget_name={formData.budget_name} handleChange={handleChange}/>
            }));
        };
        updateBody();
        // eslint-disable-next-line
    }, [formData]); // Empty dependency array to ensure this effect runs only once, equivalent to componentDidMount in class components
    const handleSubmit = async () => {
        setLoading(true);
        await Post("budgetMaster", "", formData);
        fetchData();
        handleClose();
    };
    const handleDelete = async (rowData: FormData) => {
        setLoading(true);
        await Post("budgetMasterDelete", "", rowData);
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
