package types

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type LogUserData struct {
	Mail     string `json:"mail"`
	Password string `json:"password"`
}

type User struct {
	Id       primitive.ObjectID `json:"_id" bson:"_id"`
	Name     string             `json:"name" bson:"name"`
	Mail     string             `json:"mail" bson:"mail"`
	Password string             `json:"password" bson:"password"`
}

type UserWithTodos struct {
	Id       primitive.ObjectID `json:"_id" bson:"_id"`
	Name     string             `json:"name" bson:"name"`
	Mail     string             `json:"mail" bson:"mail"`
	Password string             `json:"password" bson:"password"`
	Todos    []Todos            `json:"todos" bson:"todos"`
}

type UserWithEncryptedPassword struct {
	Id       primitive.ObjectID `json:"_id" bson:"_id"`
	Name     string             `json:"name" bson:"name"`
	Mail     string             `json:"mail" bson:"mail"`
	Password []byte             `json:"password" bson:"password"`
}

type UserWithEncryptedPasswordAndTodos struct {
	Id       primitive.ObjectID `json:"_id" bson:"_id"`
	Name     string             `json:"name" bson:"name"`
	Mail     string             `json:"mail" bson:"mail"`
	Password []byte             `json:"password" bson:"password"`
	Todos    []Todos            `json:"todos" bson:"todos"`
}

type ID string

func ValidateType[T any](data any) (T, bool) {
	validData, ok := data.(T)
	return validData, ok
}
