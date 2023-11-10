package storage

import "example/crud-todo-app/backend/types"

type Getter interface {
	GetUserWithTodosByLogin(types.LogUserData) (types.UserWithEncryptedPasswordAndTodos, error)
	GetUserWithTodosById(types.ID) (*types.UserWithTodos, error)
	GetUserById(types.ID) (*types.User, error)
	GetUserTodos(types.ID) ([]types.Todos, error)
	GetUserTodo(types.ID) (*types.Todos, error)
}

type Poster interface {
	PostUser(types.User) (types.ID, error)
	PostTodo(types.Todos) (types.ID, error)
}

type Deleter interface {
	DeleteUser(types.ID) (any, error)
	DeleteTodo(types.ID) (any, error)
}

type Updater interface {
	UpdateUser(types.User) (types.ID, error)
	UpdateTodo(types.Todos) (types.ID, error)
}
type Storer interface {
	Getter
	Poster
	Deleter
	Updater
}

func NewStorer() *MongoStorer {
	return NewMongoStorer()
}
