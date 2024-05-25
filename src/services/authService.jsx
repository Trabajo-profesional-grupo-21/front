const API_URL = 'http://localhost:8000';

const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ username: email, password }),
        });
    
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Email o contraseña incorrectos');
            }
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }
      
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message || 'Network error');
    }
  };
  
  const register = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/users/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        
        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('El email ingresado ya se encuentra registrado');
            }
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en registro');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message || 'Network error');
    }
  };

export { login, register };
