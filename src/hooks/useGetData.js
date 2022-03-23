import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetData = (API, config) => {
	const [data, setData] = useState([]);
	useEffect(async () => {
		const response = await axios(API, config);
		setData(response.data);
	}, []);
	return data;
};

export default useGetData;