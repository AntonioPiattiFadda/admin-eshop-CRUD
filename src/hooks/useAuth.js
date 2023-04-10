import React, { useState, useContext, createContext } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import endPoints from '../Services/api/';

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuthorization = () => {
  return useContext(AuthContext);
};



function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);
    if (access_token && access_token.access_token) {
      Cookies.set('Token', access_token.access_token, { expires: 7 });
      const token = Cookies.get('Token');
      // se utiliza para establecer el token de autorización en los encabezados de todas las solicitudes HTTP enviadas por Axios. En otras palabras, esta línea de código configura globalmente el encabezado de autorización para Axios.
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await axios.get(endPoints.auth.profile);
      setUser(user);
    } else {
      console.error('No se pudo obtener el access_token');
    }
  };
  const logOut = () => {
    setUser(null);
    Cookies.remove('Token');
    delete axios.defaults.headers.Authorization;
    window.location.href = '/login';
  };

  return {
    user,
    signIn,
    logOut,
  };
}
