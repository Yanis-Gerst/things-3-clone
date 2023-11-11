package usersTodosRouter

import (
	"net/http"
	"thingsCloneServer/api/controllers"
	"thingsCloneServer/api/handlers"
	"thingsCloneServer/storage"
	"thingsCloneServer/types"
)

func Use(mux *http.ServeMux, store storage.Storer) {

	handlersMapTodos := types.MapMethodHandler{"GET": controllers.CreateByIdHandler(store.GetUserTodos, "")}

	mux.HandleFunc("/users/todos", handlers.HandleHttpMethod(handlersMapTodos))
}
