package controllers

import (
	"example/crud-todo-app/backend/api/handlers"
	"example/crud-todo-app/backend/types"
	"fmt"
	"net/http"
)

type StorageOperationById[T any] func(id types.ID) (T, error)
type postStorerOperation[T any] func(requestData T) (types.ID, error)
type Middleware[Entry any, Return any] func(w http.ResponseWriter, r *http.Request, data Entry) (Return, error)

func CreateByIdHandler[ReturnFromDb any](dbOperation StorageOperationById[ReturnFromDb], sucessMessage string) http.HandlerFunc {
	byIdMiddleware := func(w http.ResponseWriter, r *http.Request, requestData map[string]types.ID) (ReturnFromDb, error) {
		var response ReturnFromDb
		id, err := handlers.GetIdFromJsonRequest(requestData)
		if err != nil {
			handlers.HandleError(w, err, http.StatusBadRequest)
			return response, err
		}

		response, err = dbOperation(id)
		if err != nil {
			handlers.HandleError(w, err, http.StatusInternalServerError)
			return response, nil
		}
		return response, nil
	}

	return CreateBodyHandler[map[string]types.ID, ReturnFromDb](byIdMiddleware, sucessMessage)

}

func CreateDatabaseOperationHandler[BodyRequest any](dbOperation postStorerOperation[BodyRequest]) http.HandlerFunc {
	postMiddleware := func(w http.ResponseWriter, r *http.Request, requestData BodyRequest) (types.ID, error) {
		var response types.ID
		response, err := dbOperation(requestData)
		if err != nil {
			handlers.HandleError(w, err, http.StatusInternalServerError)
			return response, err
		}
		return response, nil
	}

	return CreateBodyHandler[BodyRequest, types.ID](postMiddleware, "")

}

func CreateBodyHandler[BodyType any, FromDb any](middleware Middleware[BodyType, FromDb], sucessMessage string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		requestData, err := handlers.CheckRequestAndGetDataFrom[BodyType](r)
		fmt.Print(requestData, "wsh ")
		if err != nil {
			handlers.HandleError(w, err, http.StatusBadRequest)
			return
		}

		response, err := middleware(w, r, requestData)
		if err != nil {
			return
		}
		handlers.SendOkResponseWithBody(w, types.NewJsonResponse("success", response, sucessMessage))
	}
}
