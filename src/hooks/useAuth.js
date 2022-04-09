import { useState } from 'react';

const useAuth = () => {
	const [userToken, setUserToken] = useState(null);
	const [userData, setUserData] = useState({});
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userPermissions, setUserPermissions] = useState([]);
	const [headerConfig, setHeaderConfig] = useState({headers: {api: process.env.API_KEY}})

	const saveAuthData = (authObject) => {
		window.localStorage.setItem(
			'kProjectAuthUser', JSON.stringify(authObject)
		)
	}

	const getAuthData = () => {
		const userObject = window.localStorage.getItem('kProjectAuthUser');
		if (userObject !== null) {
			const { token, user } = JSON.parse(userObject);
			setUserData(user);
			setUserToken(token);
			setIsAuthenticated(true);
			const permissions = user.role.permissions.map(x => x.permission);
			setUserPermissions(...userPermissions, permissions)
			setHeaderConfig({
				headers: {
					api: process.env.API_KEY,
				  Authorization: `Bearer ${token}`,
				}
			})
		}
	}

	const deleteAuthData = () => {
		setUserData({});
		setUserToken(null);
		setIsAuthenticated(false);
		window.localStorage.removeItem('kProjectAuthUser');
	}

	return { getAuthData, saveAuthData, deleteAuthData,
		 userToken, userData, isAuthenticated,
		 headerConfig, userPermissions };
};

export default useAuth;