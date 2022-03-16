import { useEffect, useState } from 'react';
import axios from 'axios';

const useAuth = (API, object) => {
	const [exchanges, setExchanges] = useState({});

	useEffect(async () => {
		const response = await axios.post(API, object);
		setExchanges(response.data);
	}, {});
	return exchanges;
};

export default useAuth;