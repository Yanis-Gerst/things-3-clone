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

type IListener = func(addr string, handler http.Handler) error

type Server struct {
	listenAddress string
	store         storage.Storer
	listener      IListener
}

func NewServer(listenAddress string, store storage.Storer, listener IListener) *Server {
	return &Server{listenAddress: listenAddress, store: store, listener: listener}
}

func (server *Server) Start() error {
	fmt.Print("Server listening on ", server.listenAddress+"\n")
	mux := http.NewServeMux()

	usersRouter.Use(mux, server.store)
	usersTodoRouter.Use(mux, server.store)
	usersTodosRouter.Use(mux, server.store)
	userAuthRouter.Use(mux, server.store)

	return server.listener(server.listenAddress, mux)
}
