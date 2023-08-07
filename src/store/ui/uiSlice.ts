import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
    isModalOpen: boolean
}

const initialState: ModalState = {
    isModalOpen: false
} 

export const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        onOpenModal: ( state ) => {
            state.isModalOpen = true;
        },
        onCloseModal: ( state ) => {
            state.isModalOpen = false;
        }
    }
});


export const { onOpenModal, onCloseModal } = uiSlice.actions;