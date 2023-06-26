package api

import (
	"example/crud-todo-app/backend/storage"
	"example/crud-todo-app/backend/types"
	"net/http"
)

type Server struct {
	listenAddress string
	store         storage.Storer
}

func NewServer(listenAddress string, store storage.Storer) *Server {
	return &Server{listenAddress: listenAddress, store: store}
}

func (server *Server) enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Headers", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "*")
}

func (server *Server) checkPreflightRequest(w *http.ResponseWriter) {
	(*w).WriteHeader(http.StatusOK)
}

func (server *Server) Start() error {
	mux := http.NewServeMux()

	handlersMapUsers := types.MapMethodHandler{
		"POST":   server.HandlePostUser,
		"DELETE": server.HandleDeleteUser,
		"PUT":    server.HandleUpdateUser,
	}
	handlersMapTodos := types.MapMethodHandler{"GET": server.HandleGetUserTodos}
	handlersMapTodo := types.MapMethodHandler{
		"GET":    server.HandleGetUserOneTodo,
		"POST":   server.HandlePostTodo,
		"DELETE": server.HandleDeleteTodo,
		"PUT":    server.HandleUpdateTodo,
	}
	handlersAuthUser := types.MapMethodHandler{
		"POST": server.HandleGetUserLogging,
	}

	mux.HandleFunc("/users", server.handleHttpMethod(handlersMapUsers))
	mux.HandleFunc("/users/todos", server.handleHttpMethod(handlersMapTodos))
	mux.HandleFunc("/users/todos/todo", server.handleHttpMethod(handlersMapTodo))
	mux.HandleFunc("/users/auth", server.handleHttpMethod(handlersAuthUser))

	return http.ListenAndServe(server.listenAddress, mux)
}
