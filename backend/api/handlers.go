package api

import (
	"encoding/json"
	"errors"
	"example/crud-todo-app/backend/types"
	"fmt"
	"net/http"
	"regexp"
)

var httpMethods = []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete}

func (server *Server) handleHttpMethod(handlersMap types.MapMethodHandler) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		server.enableCors(&w)
		if r.Method == "OPTIONS" {
			server.checkPreflightRequest(&w)
			return
		}

		var isMethodHandle = false

		for _, httpMethod := range httpMethods {

			if httpMethod != r.Method {
				continue
			}
			handleFunction, ok := handlersMap[httpMethod]

			if ok {
				handleFunction(w, r)
				isMethodHandle = true
				break
			}
		}

		if !isMethodHandle {
			apiError(w, errors.New("not handle method"), http.StatusBadRequest)
		}

	}
}

func checkRequestAndGetDataFrom[T any](r *http.Request, urlString string) (T, error) {
	err := isGoodUrl(r, urlString)
	var validData T
	if err != nil {
		return validData, err
	}

	requestData, err := convertJsonRequestToGoValue[T](r)

	validData, ok := types.ValidateType[T](requestData)

	if !ok {
		return validData, errors.New("wrong send data format")
	}
	return validData, err
}

func isGoodUrl(r *http.Request, urlString string) error {
	regexString := fmt.Sprintf(`^\/%v$`, urlString)
	getUserExpression := regexp.MustCompile(regexString)

	if !getUserExpression.MatchString(r.URL.Path) {
		return errors.New("wrong Url")
	}

	return nil
}

func convertJsonRequestToGoValue[T any](r *http.Request) (T, error) {
	var requestData T
	err := json.NewDecoder(r.Body).Decode(&requestData)
	return requestData, err
}

func getIdFromJsonRequest(requestData map[string]types.ID) (types.ID, error) {
	val, ok := requestData["_id"]
	if !ok {
		return "", errors.New("wrong Data Send Format")
	}
	return val, nil
}

func apiError(w http.ResponseWriter, err error, statusCode int) {
	w.WriteHeader(statusCode)
	_ = json.NewEncoder(w).Encode(types.NewJsonResponse[interface{}]("error", nil, err.Error()))
}

func okResponseAndSendData(w http.ResponseWriter, response any) {
	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(response)

}
