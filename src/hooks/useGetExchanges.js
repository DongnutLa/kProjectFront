import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetExchanges = (API) => {
	const [exchanges, setExchanges] = useState([]);

	useEffect(async () => {
		const response = await axios(API);
		setExchanges(response.data);
	}, []);
	return exchanges;
};

export default useGetExchanges;