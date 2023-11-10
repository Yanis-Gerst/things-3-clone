package usersTodosRouter

import (
	"example/crud-todo-app/backend/api/controllers"
	"example/crud-todo-app/backend/api/handlers"
	"example/crud-todo-app/backend/storage"
	"example/crud-todo-app/backend/types"
	"net/http"
)

func Use(mux *http.ServeMux, store storage.Storer) {

	handlersMapTodos := types.MapMethodHandler{"GET": controllers.CreateByIdHandler(store.GetUserTodos, "")}

	mux.HandleFunc("/users/todos", handlers.HandleHttpMethod(handlersMapTodos))
}
