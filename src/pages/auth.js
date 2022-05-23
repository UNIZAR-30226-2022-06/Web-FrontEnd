// global context such that each component can behave according to it
import { createContext, useContext, useReducer } from "react";
import React from 'react';

const initialState = { user: null };

const AuthContext = createContext({
  // estado inicial
  user: null,
  login: userData => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload, //actualizar el usuario
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    //localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.clear();
    dispatch({
      type: "LOGOUT",
    });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

const useAuth = () => useContext(AuthContext);
export { AuthContext, AuthProvider, useAuth };

