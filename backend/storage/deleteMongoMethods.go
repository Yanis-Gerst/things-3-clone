package storage

import (
	"context"
	"errors"
	"example/crud-todo-app/backend/types"
	"go.mongodb.org/mongo-driver/bson"
)

var errCantDelete = errors.New("encounter an error, retry again")
var errNotFoundItem = errors.New("not found item")

func (store *MongoStorer) DeleteTodo(id types.ID) error {
	objId, err := convertIdToObjectId(id)
	if err != nil {
		return err
	}
	filter := bson.D{{Key: "_id", Value: objId}}

	result, err := store.TodosCollection.DeleteOne(context.TODO(), filter)
	if result.DeletedCount < 1 {
		return errCantDelete
	}
	return err
}

func (store *MongoStorer) DeleteUser(id types.ID) error {
	objId, err := convertIdToObjectId(id)
	filter := bson.D{{Key: "_id", Value: objId}}
	if err != nil {
		return errNotFoundItem
	}
	result, err := store.UserCollection.DeleteOne(context.TODO(), filter)
	if result.DeletedCount < 1 && err == nil {
		return errNotFoundItem
	}
	return err
}
