// // axios.js
// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_HOSTNAME, // Your API base URL
//   headers: {
//     'Content-Type': 'application/json',
//     // Add any other default headers here if needed
//   },
// });
// axios.defaults.withCredentials = true;
// axiosInstance.interceptors.request.use(
//   async function (config) {
//     loadingModalRef.current.setOpen(true);
//     let token = await localStorage.getItem("TOKEN");
//     if (token !== null) {
//       config.headers = {
//         Authorization: "Bearer " + localStorage.getItem("TOKEN"),
//       };
//       return config;
//     }
//     return config;
//   },
//   function (error) {
//     loadingModalRef.current.setOpen(false);
//     snackbarRef.current.setSnackValue({
//       status: true,
//       type: "error",
//       message: error.toString(),
//     });
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     // For successful responses, just return the response
//     return response;
//   },
//   async (error) => {
//     // Handle unauthorized (401) responses
//     const originalRequest = error.config;
//     console.log(error)
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Attempt to refresh the token
//         const refreshTokenResponse = await axiosInstance.get('api/auth/refresh-token', {
//           // Send necessary data for token refresh
//         });

//         // Update the token in localStorage or wherever necessary
//         localStorage.setItem('TOKEN', refreshTokenResponse.data.token);

//         // Retry the original request with the updated token
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         if (refreshError.response && refreshError.response.status === 401) {
//           // Token refresh failed or the new token is also expired
//           // Handle logout and redirect to the login page
//           handleLogout();
//         }

//         return Promise.reject(refreshError);
//       }
//     }

//     // For other types of errors, reject the promise
//     return Promise.reject(error);
//   }
// );

// function handleLogout() {
//   // Perform logout logic, remove token from localStorage
//   localStorage.removeItem('TOKEN');

//   // Redirect to the login page
//   window.location.href = '/';
// }
// export default axiosInstance;
