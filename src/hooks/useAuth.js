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
	const [headerConfig, setHeaderConfig] = useState({})

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
				  Authorization: `Bearer ${token}`
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
				isAdmin: true
			})
		}
		if (user.roleId === 2) {
			setUserRole({
				...userRole,
				isUser: true
			})
		}
		if (user.roleId === 3) {
			setUserRole({
				...userRole,
				isEditor: true
			})
		}
	}

	return { getAuthData, saveAuthData, deleteAuthData,
		 userToken, userData, isAuthenticated, userRole, headerConfig };
};

export default useAuth;