package usersRouter

import (
	"net/http"
	"thingsCloneServer/api/controllers"
	"thingsCloneServer/api/handlers"
	"thingsCloneServer/storage"
	"thingsCloneServer/types"
)

func Use(mux *http.ServeMux, store storage.Storer) {

	handlersMapUsers := types.MapMethodHandler{
		"DELETE": controllers.CreateByIdHandler(store.DeleteUser, ""),
		"PUT":    controllers.CreateDatabaseOperationHandler(store.UpdateUser),
	}

	mux.HandleFunc("/users", handlers.HandleHttpMethod(handlersMapUsers))
}
