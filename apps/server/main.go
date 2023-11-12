package main

import (
	"log"
	"os"
	api "thingsCloneServer/api/server"
	"thingsCloneServer/storage"

	"github.com/apex/gateway"
	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load("../../.env")
	if err != nil {
		log.Fatal("error loading env file", err)
	}

	f, err := os.Create("../../.env.public")
	if err != nil {
		log.Fatal("error can't public .env file", err)
	}
	f.WriteString("API_ADRESS = \"" + os.Getenv("URL") + "\"")

}

func main() {
	listener := gateway.ListenAndServe
	store := storage.NewStorer()
	apiAdress := os.Getenv("URL")
	server := api.NewServer(apiAdress, store, listener)

	log.Fatal(server.Start())

}
