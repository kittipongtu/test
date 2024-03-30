import axios from "axios";
import { useRef } from "react";
import LoadingModal from "./utils/loading-modal";
import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material";
import Theme from "./utils/theme";
import Routes from "./routes";
import SnackbarRef from "./utils/snackbar-ref";
import { hostname } from "./hostname";

function App() {
  const loadingModalRef = useRef(null);
  const snackbarRef = useRef(null);
  axios.defaults.withCredentials = true;
  axios.interceptors.request.use(
    async function (config) {
      loadingModalRef.current.setOpen(true);
      let token = await localStorage.getItem("TOKEN");
      if (token !== null) {
        config.headers = {
          Authorization: "Bearer " + localStorage.getItem("TOKEN"),
        };
        return config;
      }
      return config;
    },
    function (error) {
      loadingModalRef.current.setOpen(false);
      snackbarRef.current.setSnackValue({
        status: true,
        type: "error",
        message: error.toString(),
      });
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      loadingModalRef.current.setOpen(false);
      return response;
    },
    async function (error) {
      const originalConfig = error.config;
      if (originalConfig.url !== "api/auth/token" && error.response) {
       
        if (
          error.response.status === 401
        ) {
          try {
            const { data } = await axios.post(
              `${hostname}/api/auth/refresh-token`
            );
            localStorage.setItem("TOKEN", data.token);
            return axios.request(error.config);
          } catch (_error) {
            loadingModalRef.current.setOpen(false);
            localStorage.clear();
            window.location.href = "/";
            return Promise.reject(_error);
          }
        }
      }
      if (error.response.status === 401) {
        loadingModalRef.current.setOpen(false);
        localStorage.clear();
        window.location.href = "/";
      }
    }
  );
  
  return (
    <>
      <ThemeProvider theme={Theme}>
        <StyledEngineProvider injectFirst>
          <Routes />
          <LoadingModal ref={loadingModalRef} />
          <SnackbarRef ref={snackbarRef} />
        </StyledEngineProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
