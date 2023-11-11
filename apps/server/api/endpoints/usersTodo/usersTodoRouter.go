package usersTodoRouter

import (
	"net/http"
	"thingsCloneServer/api/controllers"
	"thingsCloneServer/api/handlers"
	"thingsCloneServer/storage"
	"thingsCloneServer/types"
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
