package main

import (
	api "example/crud-todo-app/backend/api/server"
	"example/crud-todo-app/backend/storage"
	"log"

	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("error loading env file", err)
	}
}

func main() {
	store := storage.NewStorer()

	server := api.NewServer(":8080", store)
	log.Fatal(server.Start())
}
