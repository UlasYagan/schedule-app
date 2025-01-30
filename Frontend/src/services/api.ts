import { baseApi, errorHandle } from "./axios";


export const getById = async <T>(url: string, id: number): Promise<T> => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await baseApi.get(`${url}?id=${id}`);
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
            const result = await baseApi.get(url);
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
            const result = await baseApi.post(url, data);
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
            const result = await baseApi.put(url, data);
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
            const result = await baseApi.delete(`${url}?id=${id}`);
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
            const result = await baseApi.delete(url);
            return resolve(result.data);
        } catch (err) {
            errorHandle(err);
            return reject(err);
        }
    });
};

