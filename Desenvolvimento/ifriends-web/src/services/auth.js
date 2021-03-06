export const TOKEN_KEY = '@user-token';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const salvarToken = data => {
	localStorage.setItem(TOKEN_KEY, data.token);
	localStorage.setItem('@user-name', data.nome);
};
export const removeTokenOnLogout = () => {
	localStorage.removeItem(TOKEN_KEY);
};