package userAuthRouter

import (
	"net/http"
	"thingsCloneServer/api/controllers"
	authentifcation "thingsCloneServer/api/endpoints/usersAuth/controllers"
	"thingsCloneServer/api/handlers"
	"thingsCloneServer/storage"
	"thingsCloneServer/types"
)

func Use(mux *http.ServeMux, store storage.Storer) {

	handlersSignInUser := types.MapMethodHandler{
		"POST": authentifcation.CreateAuthHandler(store.GetUserWithTodosByLogin),
	}

	handlersSignUpUser := types.MapMethodHandler{
		"POST": controllers.CreateDatabaseOperationHandler(store.PostUser),
	}

	handlersSessionUser := types.MapMethodHandler{
		"GET": authentifcation.CreateSessionUserHandler(store.GetUserWithTodosById),
	}

	mux.HandleFunc("/users/auth", handlers.HandleHttpMethod(handlersSessionUser))
	mux.HandleFunc("/users/auth/signin", handlers.HandleHttpMethod(handlersSignInUser))
	mux.HandleFunc("/users/auth/signup", handlers.HandleHttpMethod(handlersSignUpUser))
}
