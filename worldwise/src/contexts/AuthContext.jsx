import { createContext, useContext, useReducer } from "react";
import { FAKE_USER } from "../helpers/common";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const TYPES = {
  LOGIN: "login",
  LOGOUT: "logout",
};

function reducer(state, action) {
  switch (action.type) {
    case TYPES.LOGIN:
      return { ...state, user: action.payload, isAuthenticated: true };

    case TYPES.LOGOUT:
      return initialState;

    default:
      return state;
  }
}

export function AuthProvicer({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: TYPES.LOGIN, payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: TYPES.LOGOUT });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvicer");
  return context;
}
