import { useDispatch } from "react-redux"
// import { onCloseDateModal, onOpenDateModal } from "../store";
import { useAppSelector } from '../store/hooks';
import { onCloseModal, onOpenModal } from '../store/ui/uiSlice';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isModalOpen 
    } = useAppSelector( state => state.ui );
    

    const openModal = () => {
        dispatch( onOpenModal() );
    }

    const closeModal = () => {
        dispatch( onCloseModal() );
    }

    const toggleModal = () => {
        (isModalOpen)
            ? openModal()
            : closeModal()
    }

    return {

        // Propiedades
        isModalOpen,

        // Metodos
        openModal,
        closeModal,
        toggleModal,
    }

}