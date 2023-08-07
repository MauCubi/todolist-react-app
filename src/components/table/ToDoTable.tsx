import { TableContainer, Table} from '@mui/material';
import { ToDoTableHead } from './ToDoTableHead';
import { ToDoTableBody } from './ToDoTableBody';

export const ToDoTable = () => {
  return (
    <TableContainer>
        <Table sx={{ mt:'16px' }}>     

            <ToDoTableHead />
            
            <ToDoTableBody />

        </Table>
    </TableContainer>
            
  )
}
