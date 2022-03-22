import { useState } from 'react';

const useModalState = () => {
    const initialState = {
        loginModal: false,
        signupModal: false
    }
    
    const [modalState, setModalState] = useState(initialState);

    const toggleLogin = () => {
        setModalState({
            ...modalState, 
            loginModal: !modalState.loginModal
        });
    }
    const toggleSignup = () => {
        setModalState({
            ...modalState,
            signupModal: !modalState.signupModal
        });
    }

    return {
        modalState,
        toggleLogin,
        toggleSignup
    }
}

export default useModalState;