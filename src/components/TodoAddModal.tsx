import Modal from "react-modal"

import { Button, Checkbox, Divider, Grid, TextField, Typography, Box } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import es from 'date-fns/locale/es';
import { useForm, Controller } from 'react-hook-form';
import { isAfter } from 'date-fns';

import { useEffect, useState } from 'react';
import { useUiStore } from '../hooks/useUiStore';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTodo, setActiveTodo, updateTodo } from '../store/todos/todosSlice';


Modal.setAppElement('#root');

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto'
	},
};

type FormData = {
    title: string;
	dueDate?: Date | null ;
};
	
	
	export const TodoAddModal = () => {
		
		const { isModalOpen, closeModal } = useUiStore()
		const [checkedValue, setCheckedValue] = useState(false)

		const { activeTodo } = useAppSelector( state => state.todo ) 
		
		const dispatch = useAppDispatch()

		const form = useForm<FormData>({			
			defaultValues: {				
				title: '',
				dueDate: null
			}
		});
		
		useEffect(() => {
			if (activeTodo !== null) {
				form.setValue('title', activeTodo.title )
				if (activeTodo.dueDate) {
					setCheckedValue(true)
					form.setValue('dueDate', new Date(activeTodo.dueDate))					
				}
			}		  
		},[activeTodo, form])
		

		const { register, handleSubmit, control, formState } = form
		const { errors } = formState


		const onCloseModal = () => {
			form.reset()
			setCheckedValue(false)
			dispatch( setActiveTodo(null) )
			closeModal()
		}

		const onSubmit = (data: FormData) => {

			if (activeTodo) {
				if (!checkedValue) {
					data.dueDate = null
				}
				dispatch( updateTodo(data) )
			} else {
				dispatch( addTodo(data) )
			}
			
			form.reset()
			setCheckedValue(false)
			dispatch( setActiveTodo(null) )
			closeModal()	

		};




    return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Modal
				isOpen={ isModalOpen }
				onRequestClose={onCloseModal}
				style={customStyles}
				className="modal"
				overlayClassName="modal-fondo"
				closeTimeoutMS={ 200 }
			>
				<Grid container>
					<Grid xs={12} container m={2} item={true}>

						<Typography sx={{ fontSize:{ xs:'1.5rem', sm:'1.5rem'}, lineHeight:'1.235' }}>Agregar Tarea</Typography>

						<Divider sx={{ mt: 1, width: '100%'}}/>

						<Box component='form' width='100%' noValidate onSubmit={handleSubmit(onSubmit)}>
						
							<Grid xs={12} sx={{ mt: 2 }} item={true} wrap='wrap'>
								<TextField
									label='Nombre de la Tarea'
									type="text"																		
									fullWidth
									size='small'									
									inputProps={{ maxLength: 50, style:{fontWeight:400} }}									
									required
									{...register('title', {
										required: {
											value: true,
											message: 'Nombre de tarea requerido'
										},
										minLength: {
											value: 3,
											message: 'Minimo 3 caracteres'
										}
									}) }
								/>
								{errors.title && <Typography fontSize={12} component='span' color='error'>{errors.title.message}</Typography>}
							</Grid>

							<Grid xs={12} sx={{ mt: 2 }} item={true} >
								<Grid>
									<Typography component='label' fontSize={14} fontWeight={400}>¿Posee Límite de tiempo?</Typography>
									<Checkbox checked={checkedValue} size='small' onChange={ () => setCheckedValue(!checkedValue)} />
								</Grid>	
								
								<Grid display='flex' direction='column' container>

									<Controller 
										control={control}
										name='dueDate'
										render={({ field:{ onChange, value} }) => (				
											<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
												<DateTimePicker 
													disablePast
													disabled={ !checkedValue }
													value={ value }													
													slotProps={{ textField: { size: 'small', inputProps:{ style:{fontWeight:400} } } }}													
													onChange={onChange}
													label="Fecha Límite"																				
													viewRenderers={{ hours: renderTimeViewClock, minutes: renderTimeViewClock }}		
													minDateTime={ new Date() }
													
												/>
											</LocalizationProvider>							
										)}
										rules={{
											required: {
												value: checkedValue,
												message: 'Se requiere la fecha límite'
											},
											validate: value => 
												checkedValue? 
													isAfter( value as Date, new Date()) || 'La fecha límite tiene que ser a futuro' 
													: true									
																										
										}}
										
									/>
									{errors.dueDate && <Typography fontSize={12} component='span' color='error'>{errors.dueDate.message}</Typography>}
													
								</Grid>
																
							</Grid>							

							<Divider sx={{ my: 3}}/>

							<Grid xs={12} item={true} >
								<Button type='submit' variant='contained' color='primary' size='small' fullWidth>
									{
										activeTodo? 'Actualizar'
										: 'Agregar'
									}
								</Button>
							</Grid>

						</Box>
					</Grid>					

				</Grid>
			</Modal>

		</LocalizationProvider>
    )
  }
