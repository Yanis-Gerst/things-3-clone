package storage

import (
	"context"
	"thingsCloneServer/types"
	"thingsCloneServer/utils"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (store *MongoStorer) PostUser(user types.User) (types.ID, error) {
	newId := primitive.NewObjectID()
	newIdHex := types.ID(newId.Hex())
	user.Id = newId

	userWithEncrypPassword, err := utils.EncryptUserPassword(user)
	if err != nil {
		return newIdHex, err
	}

	_, err = store.UserCollection.InsertOne(context.TODO(), userWithEncrypPassword)
	return newIdHex, err
}

func (store *MongoStorer) PostTodo(todo types.Todos) (types.ID, error) {
	newId := primitive.NewObjectID()
	todo.Id = newId
	_, err := store.TodosCollection.InsertOne(context.TODO(), todo)
	return types.ID(newId.Hex()), err
}
