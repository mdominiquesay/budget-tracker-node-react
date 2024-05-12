type BudgetProps = {
    budget_name: string;
    handleChange: any;
};

const BudgetMasterForm: React.FC<BudgetProps> = ({ budget_name, handleChange }) => {
    return (
        <>
            <div className="form-check mb-3">
                <label htmlFor="budget_name" className="form-check-label">Enter your Budget Name:
                    <input
                        type="text"
                        name="budget_name"
                        id="budget_name"
                        value={budget_name}
                        onChange={handleChange}
                        className="form-control"
                    />
                </label>
            </div>
        </>

    );
};

export default BudgetMasterForm;
