import { TableHead, TableRow, TableCell, Checkbox, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setAllComplete, setAllIncomplete } from '../../store/todos/todosSlice';

export const ToDoTableHead = () => {

    const dispatch = useAppDispatch()

    const handleAllChecked = (e: ChangeEvent<HTMLInputElement>) => {        
        if (e.target.checked == true) {            
            dispatch( setAllComplete() )            
        } else {            
            dispatch( setAllIncomplete() )
        }
    }

  return (
    <TableHead>
        <TableRow>
            <TableCell align='center' padding='checkbox'>
                <Checkbox size='small' onChange={ handleAllChecked } />
            </TableCell>
            <TableCell sx={{ p:{ xs:'0', sm:'16'}}} >
                <Typography fontFamily='sans-serif' fontSize={{ xs:'0.9rem', sm:'1.2rem', md:'0.9rem' }} fontWeight={700}>
                    Tarea
                </Typography>
            </TableCell>
            <TableCell sx={{ textAlign:{xs:'center', sm:'right'},  p:{ xs:'0', sm:'16'} }}>
                <Typography fontFamily='sans-serif' fontSize={{ xs:'0.9rem', sm:'1.2rem', md:'0.9rem' }} fontWeight={700}>
                    Fecha Límite
                </Typography>
            </TableCell>
            <TableCell align='center' sx={{ p:{ xs:'0', sm:'16'} }}>
                <Typography fontFamily='sans-serif' fontSize={{ xs:'0.9rem', sm:'1.2rem', md:'0.9rem' }} fontWeight={700}>
                    Acciónes
                </Typography>
            </TableCell>
        </TableRow>
    </TableHead>
  )
}
