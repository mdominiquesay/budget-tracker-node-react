
import { useState, useEffect,ChangeEvent } from 'react';
import { DialogDetails, Dialog } from '../Pages/Dialog';
import { FormData, SubmitBudgetMaster, defaultBudget} from "../Model/BudgetModel";
import BusyIndicator from '../component/BusyIndicator';
interface BudgetMasterFormProps {
    fetchData: () => void;
}

const BudgetMasterForm: React.FC<BudgetMasterFormProps> = ({ fetchData }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<DialogDetails>({
        Button: "New Budget",
        Title: "Budget Name",
        Body: <h1>Body</h1>,
        Close: "Close",
        Save: "Save"
    });
    const [formData, setFormData] = useState<FormData>(defaultBudget);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const updatedFormData = { ...formData, budget_name: value };
        setFormData(updatedFormData);
    };
    const handleClose=  () => {
        setFormData(defaultBudget);
       }
    
    const handleSubmit = async () => {
        setLoading(true);
        await SubmitBudgetMaster(formData);
        fetchData();
        handleClose();
    };

    useEffect(() => {
        const updateBody = () => {
            setDetails(prevDetails => ({
                ...prevDetails,
                Body: <>
                    <div className="form-group">
                        <label htmlFor="budget_name" className="form-check-label">Enter your Budget Name:
                            <input
                                type="text"
                                name="budget_name"
                                id="budget_name"
                                value={formData.budget_name}
                                onChange={handleChange}
                                className="input-form-control"
                            />
                        </label>
                        
                    </div>
                </>
            }));
        };
        updateBody();
        // eslint-disable-next-line
    }, [formData]); 
    if (loading) {
        return <BusyIndicator />;
      }
    return (
        <>

            <div className="clipping-container">
                <Dialog DialogDetails={details}
                    onSubmit={handleSubmit}
                    onClose={handleClose}
                />
            </div>
        </>

    );
};

export default BudgetMasterForm;
