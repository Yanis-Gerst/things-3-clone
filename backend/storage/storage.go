package storage

import "example/crud-todo-app/backend/types"

type Getter interface {
	GetUserWithTodosByLogin(types.LogUserData) ([]types.UserWithTodos, error)
	GetUserById(types.ID) (*types.User, error)
	GetUserTodos(types.ID) ([]types.Todos, error)
	GetUserTodo(types.ID) (*types.Todos, error)
}

type Poster interface {
	PostUser(types.User) error
	PostTodo(types.Todos) error
}

type Deleter interface {
	DeleteUser(types.ID) error
	DeleteTodo(types.ID) error
}

type Updater interface {
	UpdateUser(types.User) error
	UpdateTodo(types.Todos) error
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
