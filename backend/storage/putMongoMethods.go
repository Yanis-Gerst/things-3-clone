package storage

import (
	"context"
	"errors"
	"example/crud-todo-app/backend/types"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
)

var errCantUpdate = errors.New("we can't find your data")

func (store *MongoStorer) UpdateUser(user types.User) (types.ID, error) {
	var response types.ID
	bsonDoc, err := toBsonDoc(user)
	if err != nil {
		return response, err
	}
	filter := bson.D{{"_id", user.Id}}
	update := bson.D{{"$set", bsonDoc}}

	result, err := store.UserCollection.UpdateOne(context.TODO(), filter, update)

	if result.MatchedCount < 1 && err != nil {
		return response, errCantUpdate
	}
	return types.ID(user.Id.Hex()), nil

}

func (store *MongoStorer) UpdateTodo(todo types.Todos) (types.ID, error) {
	var response types.ID
	bsonDoc, err := toBsonDoc(todo)
	if err != nil {
		return response, err
	}
	filter := bson.D{{"_id", todo.Id}}
	update := bson.D{{"$set", bsonDoc}}
	fmt.Println(todo)
	result, err := store.TodosCollection.UpdateOne(context.TODO(), filter, update)
	if result.MatchedCount < 1 && err != nil {

		return response, errCantUpdate
	}

	return response, nil

}

func toBsonDoc(v interface{}) (doc *bson.D, err error) {
	data, err := bson.Marshal(v)
	if err != nil {
		return

	}

	err = bson.Unmarshal(data, &doc)
	return
}
