package usersRouter

import (
	"example/crud-todo-app/backend/api/controllers"
	"example/crud-todo-app/backend/api/handlers"
	"example/crud-todo-app/backend/storage"
	"example/crud-todo-app/backend/types"
	"net/http"
)

func Use(mux *http.ServeMux, store storage.Storer) {

	handlersMapUsers := types.MapMethodHandler{
		"DELETE": controllers.CreateByIdHandler(store.DeleteUser, ""),
		"PUT":    controllers.CreateDatabaseOperationHandler(store.UpdateUser),
	}

	mux.HandleFunc("/users", handlers.HandleHttpMethod(handlersMapUsers))
}
