package api

import (
	"example/crud-todo-app/backend/types"
	"net/http"
)

var deleteSuccessMessage = "one item have been delete"

func (server *Server) HandleDeleteTodo(w http.ResponseWriter, r *http.Request) {
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

	err = server.store.DeleteTodo(todoId)
	if err != nil {
		apiError(w, err, http.StatusInternalServerError)
		return
	}

	okResponseAndSendData(w, types.NewJsonResponse[interface{}]("success", nil, deleteSuccessMessage))
}

func (server *Server) HandleDeleteUser(w http.ResponseWriter, r *http.Request) {
	requestData, err := checkRequestAndGetDataFrom[map[string]types.ID](r, "users")

	if err != nil {
		apiError(w, err, http.StatusBadRequest)
		return
	}

	userId, err := getIdFromJsonRequest(requestData)
	if err != nil {
		apiError(w, err, http.StatusBadRequest)
		return
	}

	err = server.store.DeleteUser(userId)
	if err != nil {
		apiError(w, err, http.StatusNotFound)
		return
	}

	okResponseAndSendData(w, types.NewJsonResponse[interface{}]("success", nil, deleteSuccessMessage))
}
