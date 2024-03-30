import { createContext, useContext, useState, Fragment } from "react";
import Loading from "./loading";

const LoadingContext = createContext({
  loading: false,
  setLoading: null,
});

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const value = { loading, setLoading };
  return (
    <Fragment>
      <LoadingContext.Provider value={value}>
        {children}
      </LoadingContext.Provider>
      <Loading loading={loading} setLoading={setLoading} />
    </Fragment>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}
