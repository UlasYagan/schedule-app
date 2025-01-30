import axios from "axios";

//Axios Globals
// axios.defaults.headers.common["X-Auth-Token"] =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// const headers = new AxiosHeaders({
//     'Content-Type': 'application/json',
//     //Authorization: "sometoken"
// });

//creating an instance axios
export const baseApi = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 10000,
    withCredentials: false,
    // headers: headers
});

//interceptors request
baseApi.interceptors.request.use(
    (config) => {
        const msg = `${config?.method?.toUpperCase()} request sent to ${config.url} at  ${new Date()}`;
        console.log(config);
        console.log(msg);
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

//interceptors response
baseApi.interceptors.response.use(
    (config) => {
        const msg = `${config?.status} - date: ${new Date()}`;
        console.log(config);
        console.log(msg);
        return config;
    }, (err) => {
        return Promise.reject(err);
    });

// Error Handle
export const errorHandle = (err: unknown) => {
    if (axios.isAxiosError(err)) {
        console.log(err.status)
        console.error(err.response);
        console.log("Axios Error with Message: " + err.message);
    } else {
        console.error(err);
    }
}