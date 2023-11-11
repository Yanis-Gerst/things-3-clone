package main

import (
	"log"
	api "thingsCloneServer/api/server"
	"thingsCloneServer/storage"

	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load("../../.env")
	if err != nil {
		log.Fatal("error loading env file", err)
	}
}

func main() {
	store := storage.NewStorer()

	server := api.NewServer(":8080", store)
	log.Fatal(server.Start())
}
