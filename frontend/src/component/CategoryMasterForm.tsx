import BusyIndicator from '../component/BusyIndicator';
import { useState, ChangeEvent, useEffect } from 'react';
import { Category, CreateCategory, defaultCategory } from "../Model/CategoryModel";
import { DialogDetails, Dialog } from '../Pages/Dialog';
interface CategoryMasterFormProps {
    fetchData: () => void;
}

const CategoryMasterForm: React.FC<CategoryMasterFormProps> = ({ fetchData }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const handleSubmit = async () => {
        setLoading(true);
        await CreateCategory(formData);
        setLoading(false);
        fetchData();
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };
    const [details, setDetails] = useState<DialogDetails>({
        Button: "New Category",
        Title: "Category",
        Body: <h1>Body</h1>,
        Close: "Close",
        Save: "Save"
    });
    const handleClose = () => {
        setFormData(defaultCategory);
    }
    const [formData, setFormData] = useState<Category>(defaultCategory);
    useEffect(() => {
        const updateBody = () => {
            setDetails(prevDetails => ({
                ...prevDetails,
                Body:
                    <><div >
                        <div className="form-group">
                            <label htmlFor="category_name" >Enter your Category Name:
                                <input
                                    type="text"
                                    name="category_name"
                                    id="category_name"
                                    value={formData.category_name}
                                    onChange={handleChange}
                                    className="input-form-control"
                                    required
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" >Description:
                                <textarea
                                    name="description"
                                    id="description"
                                    value={formData.description}
                                    rows={4}
                                    onChange={handleChange}
                                    className="category-form-control-textarea"
                                />
                            </label>
                        </div>
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

export default CategoryMasterForm;
