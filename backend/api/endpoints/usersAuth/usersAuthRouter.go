package userAuthRouter

import (
	"example/crud-todo-app/backend/api/controllers"
	authentifcation "example/crud-todo-app/backend/api/endpoints/usersAuth/controllers"
	"example/crud-todo-app/backend/api/handlers"
	"example/crud-todo-app/backend/storage"
	"example/crud-todo-app/backend/types"
	"net/http"
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
