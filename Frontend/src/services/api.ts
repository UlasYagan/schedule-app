import axios from "axios";

//Axios Globals
// axios.defaults.headers.common["X-Auth-Token"] =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// const headers = new AxiosHeaders({
//     'Content-Type': 'application/json',
//     //Authorization: "sometoken"
// });

//creating an instance axios
const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 10000,
    withCredentials: false,
    // headers: headers
});

//interceptors request
instance.interceptors.request.use(
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
axios.interceptors.response.use(
    (config) => {
        const msg = `${config?.status} - date: ${new Date()}`;
        console.log(config);
        console.log(msg);
        return config;
    }, (err) => {
        return Promise.reject(err);
    });

export const getById = async <T>(url: string, id: number): Promise<T> => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await instance.get(`${url}?id=${id}`);
            return resolve(result.data);
        } catch (err) {
            errorHandle(err);
            return reject(err);
        }
    });
};

export const get = async <T>(url: string): Promise<T> => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await instance.get(url);
            return resolve(result.data);
        } catch (err) {
            errorHandle(err);
            return reject(err);
        }
    });
};

export const add = async <T>(url: string, data: T): Promise<T> => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await instance.post(url, data);
            return resolve(result.data);
        } catch (err) {
            errorHandle(err);
            return reject(err);
        }
    });
};

export const edit = async <T>(url: string, data: T): Promise<T> => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await instance.put(url, data);
            return resolve(result.data);
        } catch (err) {
            errorHandle(err);
            return reject(err);
        }
    });
};

export const remove = async <T>(url: string, id: number): Promise<T> => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await instance.delete(`${url}?id=${id}`);
            return resolve(result.data);
        } catch (err) {
            errorHandle(err);
            return reject(err);
        }
    });
};

export const removeAll = async <T>(url: string): Promise<T> => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await instance.delete(url);
            return resolve(result.data);
        } catch (err) {
            errorHandle(err);
            return reject(err);
        }
    });
};

// Error Handle
const errorHandle = (err: unknown) => {
    if (axios.isAxiosError(err)) {
        console.log(err.status)
        console.error(err.response);
        console.log("Axios Error with Message: " + err.message);
    } else {
        console.error(err);
    }
}