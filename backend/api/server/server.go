package api

import (
	usersRouter "example/crud-todo-app/backend/api/endpoints/users"
	userAuthRouter "example/crud-todo-app/backend/api/endpoints/usersAuth"
	usersTodoRouter "example/crud-todo-app/backend/api/endpoints/usersTodo"
	usersTodosRouter "example/crud-todo-app/backend/api/endpoints/usersTodos"
	"example/crud-todo-app/backend/storage"
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
	mux := http.NewServeMux()

	usersRouter.Use(mux, server.store)
	usersTodosRouter.Use(mux, server.store)
	usersTodoRouter.Use(mux, server.store)
	userAuthRouter.Use(mux, server.store)

	return http.ListenAndServe(server.listenAddress, mux)
}
