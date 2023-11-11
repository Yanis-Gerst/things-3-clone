interface User {
  _id: string;
  name: string;
  mail: string;
  password: string;
}

export type UserWithTodos = User & { todos: Todos[] };
