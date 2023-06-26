package storage

import (
	"context"
	"errors"
	"example/crud-todo-app/backend/types"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoStorer struct {
	Client          *mongo.Client
	Db              *mongo.Database
	UserCollection  *mongo.Collection
	TodosCollection *mongo.Collection
}

var errStore = errors.New("store Error")

func connectToMongoDbClient() *mongo.Client {
	var err error
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(os.Getenv("MONGO_DB_URI")).SetServerAPIOptions(serverAPI)
	client, err := mongo.Connect(context.TODO(), opts)

	if err != nil {
		log.Fatal(err)
	}

	return client
}

func NewMongoStorer() *MongoStorer {
	client := connectToMongoDbClient()
	db := client.Database(os.Getenv("DB_NAME"))
	return &MongoStorer{
		Client:          client,
		Db:              db,
		UserCollection:  db.Collection(os.Getenv("USER_COLLECTION")),
		TodosCollection: db.Collection(os.Getenv("TODOS_COLLECTION")),
	}
}

func convertIdToObjectId(id types.ID) (primitive.ObjectID, error) {
	objId, err := primitive.ObjectIDFromHex(string(id))
	return objId, err
}

// func (store *MongoStorer) closeMongoStore() {
// 	if err := store.Client.Disconnect(context.TODO()); err != nil {
// 		log.Fatal(err)
// 	}
// }
