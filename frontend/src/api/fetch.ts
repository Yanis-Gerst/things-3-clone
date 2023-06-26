import axios from "axios";

const api = "http://localhost:8080";

export interface ILogUserData {
  mail: string;
  password: string;
}

export interface IJsonResponse<T> {
  status: string;
  data: T;
  msg: string;
}
export async function getUserWithTodos(logUserData: ILogUserData) {
  const response = await fetch(`${api}/users/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mail: logUserData.mail,
      password: logUserData.password,
    }),
  });

  if (!response.ok) {
    throw new Error("Fetch Failed");
  }
  return response.json();
}

export async function postTodo(todo: Todos) {
  const response = await fetch(`${api}/users/todos/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error("Post Failed");
  }
  return response.json();
}

export async function deleteTodo(id: string) {
  const response = await fetch(`${api}/users/todos/todo`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: id,
    }),
  });
  if (!response.ok) {
    throw new Error("Delete Failed");
  }
  return response.json();
}

export async function updateTodo(Todo: Todos) {
  const response = await fetch(`${api}/users/todos/todo`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Todo),
  });

  if (!response.ok) {
    throw new Error("Update Failed");
  }
  return response.json();
}
