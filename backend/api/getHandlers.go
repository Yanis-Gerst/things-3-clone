package api

import (
	"example/crud-todo-app/backend/types"
	"net/http"
)

func (server *Server) HandleGetUserLogging(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")

	userLogin, err := checkRequestAndGetDataFrom[types.LogUserData](r, "users/auth")

	if err != nil {
		apiError(w, err, http.StatusBadRequest)
		return
	}
	response, err := server.store.GetUserWithTodosByLogin(userLogin)
	if err != nil {
		apiError(w, err, http.StatusNotFound)
		return
	}
	okResponseAndSendData(w, types.NewJsonResponse("success", response[0], "log successful"))
}

func (server *Server) HandleGetUserTodos(w http.ResponseWriter, r *http.Request) {
	requestData, err := checkRequestAndGetDataFrom[map[string]types.ID](r, "users/todos")

	if err != nil {
		apiError(w, err, http.StatusBadRequest)
		return
	}
	userId, err := getIdFromJsonRequest(requestData)
	if err != nil {
		apiError(w, err, http.StatusBadRequest)
		return
	}

	response, err := server.store.GetUserTodos(userId)
	if err != nil {
		apiError(w, err, http.StatusInternalServerError)
		return
	}
	okResponseAndSendData(w, types.NewJsonResponse("success", response, "retrieve todos"))
}

func (server *Server) HandleGetUserOneTodo(w http.ResponseWriter, r *http.Request) {
	requestData, err := checkRequestAndGetDataFrom[map[string]types.ID](r, "users/todos/todo")

	if err != nil {
		apiError(w, err, http.StatusBadRequest)
		return
	}
	todoId, err := getIdFromJsonRequest(requestData)
	if err != nil {
		apiError(w, err, http.StatusBadRequest)
		return
	}

	response, err := server.store.GetUserTodo(todoId)
	if err != nil {
		apiError(w, err, http.StatusInternalServerError)
		return
	}
	okResponseAndSendData(w, types.NewJsonResponse("success", response, "retrieve todo"))
}
