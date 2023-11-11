package handlers

import (
	"encoding/json"
	"errors"
	"thingsCloneServer/types"

	"fmt"
	"net/http"
	"regexp"
)

var httpMethods = []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete}
var frontendUrl = "http://localhost:3000"

func HandleHttpMethod(handlersMap types.MapMethodHandler) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		if r.Method == "OPTIONS" {
			checkPreflightRequest(&w)
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
			HandleError(w, errors.New("not handle method"), http.StatusMethodNotAllowed)
		}

	}
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", frontendUrl)
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
	(*w).Header().Set("Access-Control-Allow-Methods", "*")
	(*w).Header().Set("Access-Control-Allow-Credentials", "true")
}

func checkPreflightRequest(w *http.ResponseWriter) {
	(*w).WriteHeader(http.StatusOK)
}

func CheckRequestAndGetDataFrom[T any](r *http.Request) (T, error) {
	requestData, err := convertJsonRequestToGoValue[T](r)

	validData, ok := types.ValidateType[T](requestData)

	if !ok {
		return validData, errors.New("wrong send data format")
	}
	return validData, err
}

func IsGoodUrl(r *http.Request, urlString string) error {
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

func GetIdFromJsonRequest(requestData map[string]types.ID) (types.ID, error) {
	val, ok := requestData["_id"]
	if !ok {
		return "", errors.New("wrong Data Send Format")
	}
	return val, nil
}

func HandleError(w http.ResponseWriter, err error, statusCode int) {
	w.WriteHeader(statusCode)
	_ = json.NewEncoder(w).Encode(types.NewJsonResponse[interface{}]("error", nil, err.Error()))
}

func SendOkResponseWithBody(w http.ResponseWriter, response any) {
	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(response)

}
