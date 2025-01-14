import { dtoUser } from "../common/dto";
import { ITodos, ITodoTasks } from "../common/interfaces";
import {
  add,
  edit,
  get,
  getById,
  remove,
  removeAll
} from "./api";


//#region todotasklist

/**
 * Get todo task detail
 * @param id 
 * @returns ITodoTasks
 */
export const getTodoTaskById = async (id: number): Promise<ITodoTasks> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result: ITodoTasks = await getById<ITodoTasks>(id);
      return resolve(result);
    } catch (err) {
      return reject(err);
    }
  });
}

/**
 * Get all Todos
 * @returns ITodoTasks[]
 */
export const getTodoTasks = async (): Promise<ITodoTasks[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await get<ITodoTasks[]>('/todotasklist');
      return resolve(result);
    } catch (err) {
      return reject(err);
    }
  });
}

/**
 * Add new todo task
 * @param entity: ITodoTasks
 * @returns ITodoTasks
 */
export const addTodoTask = async (entity: ITodoTasks): Promise<ITodoTasks> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result: ITodoTasks = await add<ITodoTasks>('/todotasklist', entity);
      return resolve(result);
    } catch (err) {
      return reject(err);
    }
  });
}

/**
 * Edit todo task
 * @param id 
 * @param entity 
 * @returns ITodoTasks
 */
export const editTodoTask = async (id: number, entity: ITodoTasks): Promise<ITodoTasks> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result: ITodoTasks = await edit<ITodoTasks>(`/todotasklist/${id}`, entity);
      return resolve(result);
    } catch (err) {
      return reject(err);
    }
  });
}

/**
 * Delete todo task
 * @param id 
 * @returns ITodoTasks
 */
export const removeTodoTaskById = async (id: number): Promise<ITodoTasks> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result: ITodoTasks = await remove<ITodoTasks>(`/todotasklist`, id);
      return resolve(result);
    } catch (err) {
      return reject(err);
    }
  });
}

//#endregion todotasklist

//#region todolist

/**
 * Get todo detail
 * @param id 
 * @returns ITodos
 */
export const getTodoById = async (id: number): Promise<ITodos> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result: ITodos = await getById<ITodos>(id);
      return resolve(result);
    } catch (err) {
      return reject(err);
    }
  });
}

/**
 * Get all Todos
 * @returns ITodos[]
 */
export const getTodos = async (): Promise<ITodos[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await get<ITodos[]>('/todolist');
      return resolve(result);
    } catch (err) {
      return reject(err);
    }
  });
}

/**
 * Add new todo
 * @param entity: ITodos
 * @returns ITodos
 */
export const addTodo = async (entity: ITodos): Promise<ITodos> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result: ITodos = await add<ITodos>('/todolist', entity);
      return resolve(result);
    } catch (err) {
      return reject(err);
    }
  });
}

/**
 * Edit todo
 * @param id 
 * @param entity 
 * @returns ITodos
 */
export const editTodo = async (id: number, entity: ITodos): Promise<ITodos> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result: ITodos = await edit<ITodos>(`/todolist/${id}`, entity);
      return resolve(result);
    } catch (err) {
      return reject(err);
    }
  });
}

/**
 * Delete todo
 * @param id 
 * @returns ITodos
 */
export const removeTodoById = async (id: number): Promise<ITodos> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result: ITodos = await remove<ITodos>(`/todolist`, id);
      return resolve(result);
    } catch (err) {
      return reject(err);
    }
  });
}

/**
 * Delete todo
 * @returns ITodos
 */
export const removeTodos = async (): Promise<ITodos> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result: ITodos = await removeAll<ITodos>(`/todolistdelete`);
      return resolve(result);
    } catch (err) {
      return reject(err);
    }
  });
}

//#endregion todolist

//#region user services 

/**
 * Get user detail
 * @param id 
 * @returns dtoUser
 */
export const getUser = async (id: number): Promise<dtoUser> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result: dtoUser = await getById<dtoUser>(id);
      return resolve(result);
    } catch (err) {
      return reject(err);
    }
  });
}

/**
 * Get all users
 * @returns dtoUser[]
 */
export const getUsers = async (): Promise<dtoUser[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result: dtoUser[] = await get<dtoUser[]>('/users');
      return resolve(result);
    } catch (err) {
      return reject(err);
    }
  });
}

/**
 * Add new user
 * @param entity: dtoUser
 * @returns dtoUser
 */
export const addUser = async (entity: dtoUser): Promise<dtoUser> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result: dtoUser = await add<dtoUser>('/users', entity);
      return resolve(result);
    } catch (err) {
      return reject(err);
    }
  });
}

/**
 * Edit User
 * @param id 
 * @param entity 
 * @returns dtoUser
 */
export const editUser = async (id: number, entity: dtoUser): Promise<dtoUser> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result: dtoUser = await edit<dtoUser>(`/users/${id}`, entity);
      return resolve(result);
    } catch (err) {
      return reject(err);
    }
  });
}

/**
 * Delete User
 * @param id 
 * @returns dtoUser
 */
export const removeUser = async (id: number): Promise<dtoUser> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result: dtoUser = await remove<dtoUser>('/users',id);
      return resolve(result);
    } catch (err) {
      return reject(err);
    }
  });
}

//#endregion user services
