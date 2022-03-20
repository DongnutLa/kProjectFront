import { useState } from 'react';

const initialState = {
    modalDisplay: false,
}


const useInitialState = () => {
    

    return {
        initialState,
    }
}

export default useInitialState;