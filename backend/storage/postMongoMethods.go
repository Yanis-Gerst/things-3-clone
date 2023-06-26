package storage

import (
	"context"
	"example/crud-todo-app/backend/types"
)

func (store *MongoStorer) PostUser(user types.User) error {
	_, err := store.UserCollection.InsertOne(context.TODO(), user)
	return err
}

func (store *MongoStorer) PostTodo(todo types.Todos) error {
	_, err := store.TodosCollection.InsertOne(context.TODO(), todo)
	return err
}
