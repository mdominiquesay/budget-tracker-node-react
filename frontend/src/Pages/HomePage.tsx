import PortalExample from './Dialog';
import { useState, useEffect, ChangeEvent } from 'react';
import Post from './Post.js';
import Get from './Get.js';
import { useNavigate } from 'react-router-dom';
import BudgetMasterRow from '../component/BudgetMasterRow';
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
    const colspan=2;
    const [formData, setFormData] = useState<FormData>({
        budget_name: '',
        id: 0
    });
    const [data, setData] = useState<FormData[]>([]);
    const fetchData = () => {
        const onSuccessFetch = (data: FormData[]) => {
            setData(data);
        };
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
                Body: <>
                    <div className="form-check mb-3">
                    <label htmlFor="budget_name" className="form-check-label">Enter your Budget Name:
                        <input
                            type="text"
                            name="budget_name"
                            id="budget_name"
                            value={formData.budget_name}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </label>
                    </div>
                </>
            }));
        };
        updateBody();
        // eslint-disable-next-line
    }, [formData]); // Empty dependency array to ensure this effect runs only once, equivalent to componentDidMount in class components
    const handleSubmit = async () => {
        await Post("budgetMaster", "", formData);
        fetchData();
        //setOpen(false);
    };
    const handleDelete = async (rowData: FormData) => {
        await Post("budgetMasterDelete", "", rowData);
        fetchData();
    };
    const handleNavigate = (path: string) => {
        navigate(path);;
   };

    return (
        <>
            <div className="clipping-container">
                <PortalExample DialogDetails={details}
                    onSubmit={handleSubmit}
                />
            </div>
            <table className="table-sm table-striped">
                <thead >
                    <tr>
                        <th>Budget</th>
                        <th colSpan={colspan}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((rowData, index) => (
                        <BudgetMasterRow key={index} rowData={rowData} onDelete={handleDelete} onNavigate={handleNavigate} />
                    ))}
                </tbody>
            </table>
        </>
    );
}
