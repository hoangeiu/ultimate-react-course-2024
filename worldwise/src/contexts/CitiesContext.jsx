import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: "",
};

const TYPES = {
  LOADING_START: "loading/start",
  LOADING_END: "loading/end",
  LOADED_CITIES: "cities/loaded",
  CREATED_CITY: "city/created",
  DELETED_CITY: "city/deleted",
  REJECTED: "rejected",
  LOADED_CITY: "city/loaded",
};

function reducer(state, action) {
  switch (action.type) {
    case TYPES.LOADING_START:
      return { ...state, isLoading: true };

    case TYPES.LOADED_CITIES:
      return { ...state, isLoading: false, cities: action.payload };

    case TYPES.CREATED_CITY:
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case TYPES.DELETED_CITY:
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case TYPES.LOADED_CITY:
      return { ...state, isLoading: false, currentCity: action.payload };

    case TYPES.REJECTED:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
}

function CitiesProvider({ children }) {
  const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: TYPES.LOADING_START });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: TYPES.LOADED_CITIES, payload: data });
      } catch (error) {
        dispatch({ type: TYPES.REJECTED, payload: error.message });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (+id === currentCity.id) return;

      try {
        dispatch({ type: TYPES.LOADING_START });
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: TYPES.LOADED_CITY, payload: data });
      } catch (error) {
        dispatch({ type: TYPES.REJECTED, payload: error.message });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      dispatch({ type: TYPES.LOADING_START });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: TYPES.CREATED_CITY, payload: data });
    } catch (error) {
      dispatch({ type: TYPES.REJECTED, payload: error.message });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: TYPES.LOADING_START });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: TYPES.DELETED_CITY, payload: id });
    } catch (error) {
      dispatch({ type: TYPES.REJECTED, payload: error.message });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
