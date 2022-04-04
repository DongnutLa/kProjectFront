import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import AuthContext from '@context/AuthContext';

const useGetData = (API, config) => {
	const { headerConfig } = useContext(AuthContext);

	const [data, setData] = useState([]);
	useEffect(() => {
		if (Object.keys(headerConfig).length > 0) {
			async function fetchData() {
				const response = await axios(API, config);
				setData(response.data);
			}
			fetchData();
		}
	}, [headerConfig]);
	return data;
};

export default useGetData;