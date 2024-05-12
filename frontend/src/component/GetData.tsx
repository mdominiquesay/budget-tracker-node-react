import BudgetMasterRow from './BudgetMasterRow';
// Define a type for the props of the TaskRow component
interface Budget {
    id: number;
    budget_name: string;
  }
  
type GetDataProps = {
    data: Budget[];
    onDelete: any;
    onNavigate: any;
  };
const GetData: React.FC<GetDataProps>  = ({data,onDelete,onNavigate}) => {
    const colspan=2;
    if(data){
    return <>
        <table className="table-sm table-striped">
                <thead >
                    <tr>
                        <th>Budget</th>
                        <th colSpan={colspan}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((rowData, index) => (
                        <BudgetMasterRow key={index} rowData={rowData} onDelete={onDelete} onNavigate={onNavigate} />
                    ))}
                </tbody>
            </table>
    </>
    }
    return null;
};

export default GetData;
