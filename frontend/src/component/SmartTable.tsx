import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
interface columns {
  value: string;
  label: string;
  sort: string;
}

interface TableProps {
  details: any;
  rowData: Array<{ [key: string]: any }>;
  mode: string;
  onDelete: (rowData: any[]) => void;
  fetchMyData: (deletails: any) => void;
}

const SmartTable: React.FC<TableProps> = ({ details, rowData, mode, onDelete, fetchMyData }) => {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [visibleFields, setVisibleFields] = useState<columns[]>(details.visibleField);
  const [oDetails, setDetails] = useState<any>(details);
  const colspan = details.visibleField.length + 1;
  const onCellClick = (field: columns) => {
    let newSortDirection: 'ascending' | 'descending' = 'ascending';
    const sFieldValue = oDetails.sort;
    // Toggle sorting logic

    if (field.value === sFieldValue) {
      newSortDirection = field.sort === 'descending' ? 'ascending' : 'descending';
    } else {
      details.sort = field.value;
      setDetails(details);
      newSortDirection = 'descending'; // Default to ascending when sorting a new field
    }

    // Update visibleFields with updated sort state
    const updatedVisibleFields = visibleFields.map(column => ({
      ...column,
      sort: column.value === field.value ? newSortDirection : '',
    }));

    setVisibleFields(updatedVisibleFields);

    // Prepare details object to pass to fetchMyData
    details.visibleField = updatedVisibleFields;

    // Call fetchMyData with details
    fetchMyData(details);
  };
  const [isAllChecked, setIsAllChecked] = useState(false);
  const handleCheckboxAll = () => {
    if (isAllChecked) {
      setSelected(new Set());
    } else {
      const allIds = rowData.map(category => category.id);
      setSelected(new Set(allIds));
    }
    setIsAllChecked(!isAllChecked);
  };
  const handleDelete = () => {

    const categoriesToDelete = rowData.filter(row => selected.has(row.id));
    onDelete(categoriesToDelete);
    setSelected(new Set()); // Clear selection after deletion
  };


  const handleCheckboxChange = (id: number) => {
    setSelected(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };
  if (rowData.length > 0) {
    return (
      <div>
        <table className="categoryTable">
          <thead>
            {mode === "MultiSelect" && (
              <tr key="delbtn">
                <th colSpan={colspan} key="Delbtn"><Button onClick={handleDelete}>Delete</Button></th>
              </tr>
            )}
            <tr key="chkbtn">
              {mode === "MultiSelect" && (
                <>
                  <th ><input type="checkbox"
                    checked={isAllChecked}
                    onChange={handleCheckboxAll}
                  /></th>
                </>
              )}
              {visibleFields && visibleFields.length > 0 &&
                visibleFields.map((field: any) => (
                  <th

                    onClick={() => onCellClick && onCellClick(field)}
                  >
                    {field.value}
                    {field.sort === 'descending' ? ' ▼' : '▲'}
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {rowData && rowData.length > 0 &&
              rowData.map((row: any, rowIndex: number) => (
                <tr key={rowIndex}>
                  {mode === "MultiSelect" && (
                    <>
                      <td >
                        <input type="checkbox"
                          checked={selected.has(row.id)}
                          onChange={() => handleCheckboxChange(row.id)}
                        />
                      </td>
                    </>
                  )}
                  {visibleFields.map((field: any) => (
                    <td >{row[field.value]}</td>
                  ))}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  } else {
    return null;
  }
};

export default SmartTable;
