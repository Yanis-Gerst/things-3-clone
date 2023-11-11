package types

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Todos struct {
	Id           primitive.ObjectID `json:"_id" bson:"_id"`
	Title        string             `json:"title" bson:"title"`
	CreatedAt    time.Time          `json:"createdAt" bson:"createdAt"`
	DeadlineAt   time.Time          `json:"deadlineAt" bson:"deadlineAt"`
	ToDoAt       time.Time          `json:"toDoAt" bson:"toDoAt"`
	Descriptions string             `json:"descriptions" bson:"descriptions"`
	UserId       primitive.ObjectID `json:"userId" bson:"userId"`
}

func (todo Todos) SetId(newId primitive.ObjectID) {
	todoPointer := &todo
	todoPointer.Id = newId
}
