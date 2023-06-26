package api

import (
	"errors"
	"example/crud-todo-app/backend/types"
	"example/crud-todo-app/backend/utils"
	"net/http"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

var successPostMessage = "Data have been send"

func (server *Server) HandlePostUser(w http.ResponseWriter, r *http.Request) {
	requestData, err := checkRequestAndGetDataFrom[types.User](r, "users")

	if err != nil {
		apiError(w, err, http.StatusBadRequest)
		return
	}
	requestData.Id = primitive.NewObjectID()

	err = utils.AllFieldsIsDefined(requestData)
	err = utils.IsValidEmail(requestData.Mail)
	if err != nil {
		apiError(w, errors.New("wrong user format"), http.StatusBadRequest)
		return
	}

	err = server.store.PostUser(requestData)

	if err != nil {
		apiError(w, err, http.StatusInternalServerError)
		return
	}

	okResponseAndSendData(w, types.NewJsonResponse[interface{}]("success", requestData.Id, successPostMessage))

}

func (server *Server) HandlePostTodo(w http.ResponseWriter, r *http.Request) {
	requestData, err := checkRequestAndGetDataFrom[types.Todos](r, "users/todos/todo")

	if err != nil {
		apiError(w, err, http.StatusBadRequest)
		return
	}
	requestData.Id = primitive.NewObjectID()
	err = server.store.PostTodo(requestData)

	if err != nil {
		apiError(w, err, http.StatusInternalServerError)
		return
	}

	okResponseAndSendData(w, types.NewJsonResponse[interface{}]("success", requestData.Id, successPostMessage))
}
