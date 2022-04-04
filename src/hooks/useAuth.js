import { useState } from 'react';

const roles = {
	isAdmin: false,
	isUser: false,
	isEditor: false,
}

const useAuth = () => {
	const [userToken, setUserToken] = useState(null);
	const [userData, setUserData] = useState({});
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userRole, setUserRole] = useState(roles);
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
			setRoles(user);
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

	const setRoles = (user) => {
		if (user.roleId === 1) {
			setUserRole({
				...userRole,
				isUser: true,
				isEditor: true,
				isAdmin: true
			})
		}
		if (user.roleId === 2) {
			setUserRole({
				...userRole,
				isUser: true,
				isEditor: false,
				isAdmin: false
			})
		}
		if (user.roleId === 3) {
			setUserRole({
				...userRole,
				isUser: true,
				isEditor: true,
				isAdmin: false
			})
		}
	}

	return { getAuthData, saveAuthData, deleteAuthData,
		 userToken, userData, isAuthenticated, userRole, headerConfig };
};

export default useAuth;