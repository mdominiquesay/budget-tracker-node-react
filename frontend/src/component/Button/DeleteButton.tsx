import React, { useCallback } from 'react';
import {Category} from "../../Model/CategoryModel";

// Define a type for the props of the TaskRow component
type CategoryProps = {
  rowData: Category;
  onDelete: (rowData: Category) => void;
};

// Define the TaskRow component
const DeleteButton: React.FC<CategoryProps> = ({ rowData, onDelete }) => {

  const handleDelete = useCallback(() => {
    onDelete(rowData);
  }, [onDelete, rowData]);
  return (
    <>        
        <button className="btn btn-primary" onClick={handleDelete} >Delete</button>
    </>

  );
};

export default DeleteButton;
