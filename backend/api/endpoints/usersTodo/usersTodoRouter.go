package usersTodoRouter

import (
	"example/crud-todo-app/backend/api/controllers"
	"example/crud-todo-app/backend/api/handlers"
	"example/crud-todo-app/backend/storage"
	"example/crud-todo-app/backend/types"
	"net/http"
)

func Use(mux *http.ServeMux, store storage.Storer) {

	handlersMapTodo := types.MapMethodHandler{
		"GET":    controllers.CreateByIdHandler(store.GetUserTodo, ""),
		"POST":   controllers.CreateDatabaseOperationHandler(store.PostTodo),
		"DELETE": controllers.CreateByIdHandler(store.DeleteTodo, ""),
		"PUT":    controllers.CreateDatabaseOperationHandler(store.UpdateTodo),
	}

	mux.HandleFunc("/users/todos/todo", handlers.HandleHttpMethod(handlersMapTodo))
}
