package storage

import (
	"context"
	"errors"
	"example/crud-todo-app/backend/types"
	"go.mongodb.org/mongo-driver/bson"
)

func (store *MongoStorer) GetUserWithTodosByLogin(requestData types.LogUserData) ([]types.UserWithTodos, error) {
	pipeline := bson.A{
		bson.D{
			{"$match", bson.D{
				{
					"mail", requestData.Mail,
				},
				{
					"password", requestData.Password,
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

	var response []types.UserWithTodos
	cur, err := store.UserCollection.Aggregate(context.TODO(), pipeline)
	if err != nil {
		return response, err
	}

	err = cur.All(context.TODO(), &response)
	if err != nil {
		return response, err
	}
	if len(response) < 1 {
		return response, errors.New("no match")
	}

	return response, nil
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
