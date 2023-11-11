package storage

import (
	"context"
	"errors"
	"thingsCloneServer/types"

	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

func (store *MongoStorer) GetUserWithTodosByLogin(requestData types.LogUserData) (types.UserWithEncryptedPasswordAndTodos, error) {

	pipeline := bson.A{
		bson.D{
			{Key: "$match", Value: bson.D{
				{
					Key: "mail", Value: requestData.Mail,
				},
			}},
		},
		bson.D{
			{Key: "$lookup", Value: bson.D{
				{Key: "from", Value: "Todos"},
				{Key: "localField", Value: "_id"},
				{Key: "foreignField", Value: "userId"},
				{Key: "as", Value: "todos"},
			}},
		},
	}

	var logUser types.UserWithEncryptedPasswordAndTodos
	var response []types.UserWithEncryptedPasswordAndTodos
	cur, err := store.UserCollection.Aggregate(context.TODO(), pipeline)
	if err != nil {
		return logUser, err
	}

	err = cur.All(context.TODO(), &response)
	if err != nil {
		return logUser, err
	}
	if len(response) < 1 {
		return logUser, errors.New("no match")
	}

	logUser = response[0]

	err = bcrypt.CompareHashAndPassword(logUser.Password, []byte(requestData.Password))
	if err != nil {
		return logUser, errors.New("wrong password or email")
	}

	return logUser, nil
}

func (store *MongoStorer) GetUserById(userId types.ID) (*types.User, error) {
	filter := bson.D{{Key: "_id", Value: userId}}

	var response types.User
	store.UserCollection.FindOne(context.TODO(), filter).Decode(&response)
	return &response, nil
}

func (store *MongoStorer) GetUserTodos(userId types.ID) ([]types.Todos, error) {
	objId, err := convertIdToObjectId(userId)
	var response []types.Todos

	if err != nil {
		return response, errStore
	}
	filter := bson.D{{Key: "userId", Value: objId}}

	cur, err := store.TodosCollection.Find(context.TODO(), filter)
	defer cur.Close(context.TODO())
	if err != nil {
		return response, errStore
	}
	err = cur.All(context.TODO(), &response)

	if err != nil {
		return response, errStore
	}

	return response, nil
}

func (store *MongoStorer) GetUserTodo(todoId types.ID) (*types.Todos, error) {
	objId, err := convertIdToObjectId(todoId)
	var response types.Todos
	if err != nil {
		return &response, errStore
	}
	filter := bson.D{{Key: "_id", Value: objId}}

	store.TodosCollection.FindOne(context.TODO(), filter).Decode(&response)
	return &response, nil

}

func (store *MongoStorer) GetUserWithTodosById(id types.ID) (*types.UserWithTodos, error) {
	objId, err := convertIdToObjectId(id)
	var response []types.UserWithTodos
	if err != nil {
		return nil, errStore
	}

	pipeline := bson.A{
		bson.D{
			{"$match", bson.D{
				{
					"_id", objId,
				},
			}},
		},
		bson.D{
			{"$lookup", bson.D{
				{"from", "Todos"},
				{"localField", "_id"},
				{"foreignField", "userId"},
				{"as", "todos"},
			}},
		},
	}

	cur, err := store.UserCollection.Aggregate(context.TODO(), pipeline)
	if err != nil {
		return nil, err
	}

	err = cur.All(context.TODO(), &response)
	if err != nil {
		return nil, err
	}
	if len(response) < 1 {
		return nil, errors.New("no match")
	}

	return &response[0], nil

}
