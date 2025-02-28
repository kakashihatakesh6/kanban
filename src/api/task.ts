import { deletes, get, post, put } from "@/lib/axios.interceptor";
import { Task } from "@/interfaces/task";

export const createTask = async (payload: Task) => {
  const response = await post(`api/tasks/create`, payload);
  return response?.data;
};

export const getTask = async (Task_id: string) => {
  const response = await get(`api/tasks/${Task_id}`);
  return response?.data;
};

export const editTask = async (
  Task_id: string,
  payload: Task
) => {
  const response = await put(`api/tasks/${Task_id}`, payload);
  return response?.data;
};

export const deleteTask = async (Task_id: string) => {
  const response = await deletes(`api/tasks/${Task_id}`);
  return response?.data;
};

export const getAllTasks = async () => {
  const response = await get(`api/Tasks`);
  return response?.data;
};
