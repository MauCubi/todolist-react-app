import { TableBody, TableRow, TableCell, Checkbox, Typography, Box, IconButton } from '@mui/material';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { differenceInCalendarDays } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteTodo, setActiveTodo, setCompleted } from '../../store/todos/todosSlice';
import { ToDo } from '../../types';
import { useUiStore } from '../../hooks/useUiStore';

export const ToDoTableBody = () => {

    const dispatch = useAppDispatch()
    const {todos} = useAppSelector( state => state.todo )   
    const { openModal } = useUiStore()   

    const handleChecked = (id: number) => {
        dispatch( setCompleted(id) )
    }

    const handleSelectTodo = (todo: ToDo) => {        
        dispatch( setActiveTodo(todo) )        
        openModal()
    }

    const handleDeleteTodo = (id: string) => {
        dispatch( deleteTodo(id) )
    }


  return (
    <TableBody>
        {
            todos?.map( (todo, index) => (                    
                <TableRow key={todo.id}>
                    <TableCell component='th' scope='row' align='center' padding='checkbox'>
                        <Checkbox checked={todo.status} size='small' onChange={ () => handleChecked(index) }/>
                    </TableCell>
                    <TableCell padding='none'>
                        <Typography 
                            color={ (todo.status === true? 'gray' : 'black' )} 
                            sx={{ textDecoration: (todo.status === true)? 'line-through': '' }}    
                            fontSize={{ xs:'0.9rem', sm:'1rem' }}                                       
                        >
                            { todo.title }
                        </Typography>
                    </TableCell>
                    <TableCell align='right' padding='none' >
                        <Box component='div' display='flex' justifyContent={{ xs:'center', sm:'right' }} alignItems='center'>
                            {
                            todo.dueDate
                                ? 
                                <>
                                    <HourglassBottomIcon 
                                        color={
                                            (todo.status === true)?'disabled'
                                            :(differenceInCalendarDays(new Date(todo.dueDate), new Date())  > 3 )?
                                            'success'
                                            :(differenceInCalendarDays(new Date(todo.dueDate), new Date())  > 1 )?
                                            'warning'
                                            :'error'
                                        }
                                        sx={{ fontSize:{ xs:'1.1rem', sm:'1.3rem' } }}
                                    />

                                    <Typography 
                                        width='50%' 
                                        color={
                                            (todo.status === true)?'GrayText'
                                            :(differenceInCalendarDays(new Date(todo.dueDate), new Date())  > 3 )?
                                            '#66bb6a'
                                            :(differenceInCalendarDays(new Date(todo.dueDate), new Date())  > 1 )?
                                            '#f57c00'
                                            :'error'
                                        }
                                        fontSize={{ xs:'0.9rem', sm:'1rem' }} 
                                    >
                                        { new Date(todo.dueDate).toLocaleString() }
                                    </Typography>
                                </> 
                                : ''
                            }
                        </Box>
                    </TableCell>
                    <TableCell align='center' sx={{ paddingTop:'16px', paddingX:{ xs:'16px', sm:'16px' } } }>  

                            <IconButton 
                                color='warning' 
                                sx={{ fontSize:{ xs:'1.125rem', sm:'1.6rem' } }} 
                                title='Editar tarea'  
                                onClick={ () => handleSelectTodo(todo) }
                                disabled={ todo.status }
                            >
                                <EditIcon fontSize='inherit'/>
                            </IconButton>    

                            <IconButton 
                                color='error' 
                                sx={{ fontSize:{ xs:'1.125rem', sm:'1.6rem' } }} 
                                title='Eliminar tarea'  
                                onClick={ () => handleDeleteTodo(todo.id) }
                            >
                                <DeleteIcon fontSize='inherit' />
                            </IconButton>    

                    </TableCell>
                </TableRow>
            ))                        
        }
    </TableBody>
  )
}
