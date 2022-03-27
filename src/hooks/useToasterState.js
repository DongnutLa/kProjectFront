import { useState, useEffect } from 'react';

const types = {
    ERROR: 'ERROR',
    SUCCESS: 'SUCCESS'
}
const initialToasterStatus = {
    visible: false,
    type: null,
    content: '',
}

const useToasterState = () => {
    const [toasterStatus, setToasterStatus] = useState(initialToasterStatus)
    const [openToaster, setOpenToaster] = useState({});

    useEffect(() => {
        if (Object.keys(openToaster).length > 0) {
            setToasterStatus({...toasterStatus, visible: true, type: openToaster.type, content: openToaster.content});
            setTimeout(() => {
                setToasterStatus(initialToasterStatus);
            }, 3000);
            setOpenToaster({});
        }
    }, [openToaster])

    return {
        initialToasterStatus,
        types,
        toasterStatus,
        setToasterStatus,
        setOpenToaster
    }
}

export default useToasterState;