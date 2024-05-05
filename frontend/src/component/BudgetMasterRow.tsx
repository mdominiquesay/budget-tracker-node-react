import React, { useCallback } from 'react';

interface Budget {
  id: number;
  budget_name: string;
}


// Define a type for the props of the TaskRow component
type BudgetProps = {
  rowData: Budget;
  onDelete: any;
  onNavigate: any;
};

// Define the TaskRow component
const BudgetMasterRow: React.FC<BudgetProps> = ({ rowData, onDelete, onNavigate }) => {

  const handleDelete = useCallback(() => {
    onDelete(rowData);
  }, [onDelete, rowData]);
  const handleView = useCallback(() => {
    onNavigate("/edit/" + rowData.id);;
  }, [rowData, onNavigate]);
  return (
    <tr>
      <td>{rowData.budget_name}</td>
      <td>
        <button className="btn btn-primary" onClick={handleDelete} >Delete</button>
      </td>
      <td>
        <button className="btn btn-primary" onClick={handleView} > View </button>
      </td>
    </tr>
  );
};

export default BudgetMasterRow;
