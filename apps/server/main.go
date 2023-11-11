package main

import (
	"log"
	"os"
	api "thingsCloneServer/api/server"
	"thingsCloneServer/storage"

	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load("../../.env.local")
	if err != nil {
		log.Fatal("error loading env file", err)
	}

}

func main() {
	store := storage.NewStorer()
	apiAdress := os.Getenv("API_ADRESS")
	server := api.NewServer(apiAdress, store)

	log.Fatal(server.Start())

}
