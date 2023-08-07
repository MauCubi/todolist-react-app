import { Box, Typography, Button } from '@mui/material';
import '@fontsource/roboto/400.css';

import { useEffect } from 'react';
import { TodoAddModal } from './components/TodoAddModal';
import { getTodos } from './store/todos/todosSlice';
import { useUiStore } from './hooks/useUiStore';
import { useAppDispatch } from './store/hooks';
import { ToDoTable } from './components/table/ToDoTable';



export const TodoListApp = () => {

    const dispatch = useAppDispatch()   
       
    const { openModal } = useUiStore()   

    useEffect(() => {
      dispatch( getTodos() )    

    },[dispatch])

    const handleClickNew = () => {
        openModal()
    }

  return (
    <Box component='div' minHeight='100vh' display='flex' alignItems='center' flexDirection='column' mb={{ xs:'60px', sm:'100px', md:'70px'}}>
    
        <Box 
            component='div' 
            display='flex' 
            textAlign='center' 
            padding={{ xs:0, sm:2}} 
            flexDirection='column' 
            width={{ xs:'100%', sm:'80%', md:'60%' }} 
            my={{ xs:1, sm:4 }}  
            boxShadow={{ xs:0, sm:4 }} 
        >

            {/* Titulo + boton agregar / Title + add button  */}
            <Typography fontSize={{ xs:'1.65rem', sm:'2.25rem', md:'1.7rem'}} fontFamily='sans-serif' my={{ xs:3, md:1 }}>Todo List App</Typography>   

            <Box component='div' display='flex' justifyContent={{ xs:'center', sm:'end' }} m={{ xs:0, sm:1 }}>
                <Button 
                    color='primary' 
                    variant='contained' 
                    sx={{ 
                        width:{ xs:'90%', sm:'fit-content'},                         
                        height:{ xs:'1.8rem', md:'1.6rem' },
                        alignSelf:{ xs:'center', sm:'right' }                        
                    }}                                         
                    onClick={ handleClickNew }
                >
                    <Typography fontSize={{ xs:'0.8rem', sm:'0.95rem', md:'0.7rem' }}>
                        Agregar Tarea
                    </Typography> 
                </Button>
            </Box>

            {/* Tabla entera de las tareas / Full Todo table  */}
            <ToDoTable />

            {/* Modal con formulario de tareas / Todo form modal  */}
            <TodoAddModal />

        </Box>
        
        
    </Box>
  )
}
