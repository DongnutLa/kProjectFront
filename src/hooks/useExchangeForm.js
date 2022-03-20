import { useState } from 'react';

const useExchangeForm = () => {
    let initialState = {
        type: ''
    }
	const [exchangeHave, setExchangeHave] = useState(initialState);
	const [exchangeWant, setExchangeWant] = useState(initialState);
	const [exchangeDetails, setExchangeDetails] = useState({});
    
	const addExchange = (data, type) => {
        if(type === 'have') {
            setExchangeHave({
                type: type,
                data
            });
        }
        if(type === 'want') {
            setExchangeWant({
                type: type,
                data
            });
        }
    }

    const addDetails = (data) => {
        setExchangeDetails(data);
    }

    const joinData = () => {
        let exchangeData = [exchangeHave, exchangeWant, exchangeDetails]
        console.log(exchangeData);
    }

    return {
        addExchange,
        addDetails,
        joinData
    }
};

export default useExchangeForm;