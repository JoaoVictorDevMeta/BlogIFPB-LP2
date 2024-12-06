export function logout(navigate) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/auth');
}