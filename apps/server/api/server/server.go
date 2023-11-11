package api

import (
	"fmt"
	usersRouter "thingsCloneServer/api/endpoints/users"
	userAuthRouter "thingsCloneServer/api/endpoints/usersAuth"
	usersTodoRouter "thingsCloneServer/api/endpoints/usersTodo"
	usersTodosRouter "thingsCloneServer/api/endpoints/usersTodos"
	"thingsCloneServer/storage"

	"net/http"
)

type Server struct {
	listenAddress string
	store         storage.Storer
}

func NewServer(listenAddress string, store storage.Storer) *Server {
	return &Server{listenAddress: listenAddress, store: store}
}

func (server *Server) Start() error {
	fmt.Print("Server listening on ", server.listenAddress+"\n")
	mux := http.NewServeMux()

	usersRouter.Use(mux, server.store)
	usersTodoRouter.Use(mux, server.store)
	usersTodosRouter.Use(mux, server.store)
	userAuthRouter.Use(mux, server.store)

	return http.ListenAndServe(server.listenAddress, mux)
}
