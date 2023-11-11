package storage

import (
	"context"
	"errors"
	"thingsCloneServer/types"

	"go.mongodb.org/mongo-driver/bson"
)

var errCantDelete = errors.New("encounter an error, retry again")
var errNotFoundItem = errors.New("not found item")

func (store *MongoStorer) DeleteTodo(id types.ID) (any, error) {
	objId, err := convertIdToObjectId(id)
	if err != nil {
		return nil, err
	}
	filter := bson.D{{Key: "_id", Value: objId}}

	result, err := store.TodosCollection.DeleteOne(context.TODO(), filter)
	if result.DeletedCount < 1 {
		return nil, errCantDelete
	}
	return nil, err
}

func (store *MongoStorer) DeleteUser(id types.ID) (any, error) {
	objId, err := convertIdToObjectId(id)
	filter := bson.D{{Key: "_id", Value: objId}}
	if err != nil {
		return nil, errNotFoundItem
	}
	result, err := store.UserCollection.DeleteOne(context.TODO(), filter)
	if result.DeletedCount < 1 && err == nil {
		return nil, errNotFoundItem
	}
	return nil, err
}
