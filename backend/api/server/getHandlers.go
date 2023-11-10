package api

import (
	"example/crud-todo-app/backend/api/handlers"
	"example/crud-todo-app/backend/types"
	"net/http"
)

func (server *Server) HandleGetUserTodos(w http.ResponseWriter, r *http.Request) {
	requestData, err := handlers.CheckRequestAndGetDataFrom[map[string]types.ID](r)

	if err != nil {
		handlers.HandleError(w, err, http.StatusBadRequest)
		return
	}
	userId, err := handlers.GetIdFromJsonRequest(requestData)
	if err != nil {
		handlers.HandleError(w, err, http.StatusBadRequest)
		return
	}

	response, err := server.store.GetUserTodos(userId)
	if err != nil {
		handlers.HandleError(w, err, http.StatusInternalServerError)
		return
	}
	handlers.SendOkResponseWithBody(w, types.NewJsonResponse("success", response, "retrieve todos"))
}

func (server *Server) HandleGetUserOneTodo(w http.ResponseWriter, r *http.Request) {
	requestData, err := handlers.CheckRequestAndGetDataFrom[map[string]types.ID](r)

	if err != nil {
		handlers.HandleError(w, err, http.StatusBadRequest)
		return
	}
	todoId, err := handlers.GetIdFromJsonRequest(requestData)
	if err != nil {
		handlers.HandleError(w, err, http.StatusBadRequest)
		return
	}

	response, err := server.store.GetUserTodo(todoId)
	if err != nil {
		handlers.HandleError(w, err, http.StatusInternalServerError)
		return
	}
	handlers.SendOkResponseWithBody(w, types.NewJsonResponse("success", response, "retrieve todo"))
}
