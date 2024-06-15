import {Category,DeleteManyCategory} from "../Model/CategoryModel";

import Button from 'react-bootstrap/Button';
import { useState } from 'react';
// Define a type for the props of the CategoryRow component
type CategoryProps = {
  rowData: Category[];
  onDelete: (rowData: Category[]) => void;
};

// Define the CategoryRow component
const CategoryRow: React.FC<CategoryProps> = ({ rowData, onDelete }) => {
  const colspan=3;
  const [deleteList,setDelete] =useState<Category[]>([]);
 
  const handleDelete = () => {
    
    const categoriesToDelete = rowData.filter(category => selectedCategories.has(category.id));
    onDelete(categoriesToDelete)
   
    setSelectedCategories(new Set()); // Clear selection after deletion
  };
  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(new Set());
  const [isAllChecked, setIsAllChecked] = useState(false);
  const handleCheckboxChange = (id: number) => {
    setSelectedCategories(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleCheckboxAll = () => {
    if (isAllChecked) {
      setSelectedCategories(new Set());
    } else {
      const allIds = rowData.map(category => category.id);
      setSelectedCategories(new Set(allIds));
    }
    setIsAllChecked(!isAllChecked);
  };
  if (rowData.length > 0) {
    return (
      <>
      <table className="categoryTable">
        <tr>
          <th colSpan={colspan}><Button onClick={handleDelete}>Delete</Button></th>
        </tr>
        <tr>
          <th><input type="checkbox"
          checked={isAllChecked}
          onChange={handleCheckboxAll}
          /></th>
          <th>Category Name</th>
          <th>Description</th>
          
        </tr>
        {rowData.map((data) => (
          <tr key={data.id}>
            <td>
              <input type="checkbox"
              checked={selectedCategories.has(data.id)}
              onChange={() => handleCheckboxChange(data.id)}
              />
            </td>
            <td>{data.category_name}</td>
            <td>{data.description}</td>
            
          </tr>
        ))}
        </table>
      </>
      
    );
  } else {
    return null;
  }
};

export default CategoryRow;
