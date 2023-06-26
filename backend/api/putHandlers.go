package api

import (
	"example/crud-todo-app/backend/types"
	"net/http"
)

var successPutMessage = "one item have been updated"

func (server *Server) HandleUpdateUser(w http.ResponseWriter, r *http.Request) {
	requestData, err := checkRequestAndGetDataFrom[types.User](r, "users")

	if err != nil {
		apiError(w, err, http.StatusBadRequest)
		return
	}

	err = server.store.UpdateUser(requestData)

	if err != nil {
		apiError(w, err, http.StatusNotFound)
		return
	}

	okResponseAndSendData(w, types.NewJsonResponse[interface{}]("success", nil, successPutMessage))

}

func (server *Server) HandleUpdateTodo(w http.ResponseWriter, r *http.Request) {
	requestData, err := checkRequestAndGetDataFrom[types.Todos](r, "users/todos/todo")
	if err != nil {
		apiError(w, err, http.StatusBadRequest)
		return
	}

	err = server.store.UpdateTodo(requestData)

	if err != nil {
		apiError(w, err, http.StatusInternalServerError)
		return
	}
	okResponseAndSendData(w, types.NewJsonResponse[interface{}]("success", nil, successPutMessage))
}
